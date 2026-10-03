const express = require("express");
const router = express.Router();
const { investigateMessage } = require("../services/aria");

/**
 * @swagger
 * /api/investigate:
 *   post:
 *     summary: Investigate a suspicious message
 *     description: ARIA analyzes any suspicious SMS, WhatsApp message, email or URL and returns a verdict
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Congratulations! You won KBC lottery Rs.25 lakhs. Send Aadhaar to claim."
 *     responses:
 *       200:
 *         description: Investigation complete
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     verdict:
 *                       type: string
 *                       example: SCAM
 *                     confidence:
 *                       type: integer
 *                       example: 95
 *                     verdictClass:
 *                       type: string
 *                       example: scam
 *                     steps:
 *                       type: array
 *                     actions:
 *                       type: string
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    const ip = req.ip || req.connection.remoteAddress;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (message.length > 2000) {
      return res.status(400).json({ error: "Message too long (max 2000 chars)" });
    }

    const result = await investigateMessage(message, ip);
    res.json({ success: true, data: result });

  } catch (error) {
    console.error("Investigation error:", error.message);
    res.status(500).json({ error: "Investigation failed. Please try again." });
  }
});

module.exports = router;