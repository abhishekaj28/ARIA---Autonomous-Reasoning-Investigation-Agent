require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const investigateRoute = require("./routes/investigate");
const { getStats, getRecentInvestigations, getThreatBreakdown } = require("./database/db");

const app = express();

// Security & Middleware
app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(morgan("dev"));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { error: "Too many requests. Please wait." },
});
app.use(limiter);

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ARIA — Autonomous Reasoning & Investigation Agent",
      version: "1.0.0",
      description: "AI-powered cyber threat detection API for Indian users",
    },
    servers: [{ url: "http://localhost:5000" }],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/investigate", investigateRoute);

// Health check
/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Check if ARIA is online
 *     responses:
 *       200:
 *         description: ARIA is online
 */
app.get("/api/health", (req, res) => {
  res.json({ status: "ARIA ONLINE", timestamp: new Date().toISOString() });
});

// Stats endpoint
/**
 * @swagger
 * /api/stats:
 *   get:
 *     summary: Get investigation statistics
 *     responses:
 *       200:
 *         description: Stats returned successfully
 */
app.get("/api/stats", (req, res) => {
  try {
    const stats = getStats();
    const recent = getRecentInvestigations(10);
    const breakdown = getThreatBreakdown();

    res.json({
      success: true,
      data: {
        overview: stats,
        recentInvestigations: recent,
        threatBreakdown: breakdown,
      },
    });
  } catch (error) {
    console.error("Stats error:", error.message);
    res.status(500).json({ error: "Failed to fetch stats." });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🛡️  ARIA Backend running on http://localhost:${PORT}`);
  console.log(`✅  Health check: http://localhost:${PORT}/api/health`);
  console.log(`📊  Stats: http://localhost:${PORT}/api/stats`);
  console.log(`📚  API Docs: http://localhost:${PORT}/api/docs`);
});