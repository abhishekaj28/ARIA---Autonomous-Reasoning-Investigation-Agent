const { saveInvestigation } = require("../database/db");

async function investigateMessage(message, ip) {
  const scamPatterns = [
    { pattern: /won|winner|lottery|prize|lucky draw|jackpot/i, flag: "Prize/lottery language detected" },
    { pattern: /click here|verify now|update kyc|act immediately|urgent|immediately|asap/i, flag: "Urgency manipulation detected" },
    { pattern: /bit\.ly|tinyurl|shorturl|t\.me\/|http:\/\/(?!.*https)/i, flag: "Suspicious shortened/unsecured URL" },
    { pattern: /send.*money|transfer.*amount|pay.*fee|registration fee|processing fee/i, flag: "Upfront payment request detected" },
    { pattern: /otp|password|pin|cvv|card number|account number|bank details/i, flag: "Sensitive credential request" },
    { pattern: /blocked|suspended|deactivated|expire|terminated/i, flag: "Account threat language" },
    { pattern: /whatsapp|telegram|call now|contact immediately|helpline/i, flag: "Redirect to unverified channel" },
    { pattern: /free|guaranteed|100%|no risk|double your money/i, flag: "Too-good-to-be-true language" },
    { pattern: /kbc|kaun banega|crorepati|amitabh/i, flag: "KBC lottery scam pattern" },
    { pattern: /aadhaar|pan card|kyc|vpa|upi id/i, flag: "Identity document request" },
    { pattern: /job offer|work from home|earn.*daily|salary.*week/i, flag: "Fake job offer pattern" },
    { pattern: /\.xyz|\.top|\.club|\.online|\.site/i, flag: "Suspicious domain extension" },
    { pattern: /income tax|it department|tax refund|tds refund/i, flag: "Government impersonation" },
    { pattern: /custom.*duty|parcel.*stuck|courier.*package/i, flag: "Courier/customs scam pattern" },
  ];

  const safePatterns = [
    { pattern: /otp.*valid.*minute|do not share.*otp|never share.*otp/i, flag: "Legitimate OTP warning" },
    { pattern: /sbi yono|hdfc netbanking|icici bank official/i, flag: "Known legitimate sender" },
    { pattern: /noreply@|no-reply@/i, flag: "Official no-reply sender format" },
  ];

  const redFlags = scamPatterns.filter(p => p.pattern.test(message)).map(p => p.flag);
  const safeFlags = safePatterns.filter(p => p.pattern.test(message)).map(p => p.flag);

  // Verdict logic
  let verdict, verdictClass, confidence;

  if (safeFlags.length > 0 && redFlags.length === 0) {
    verdict = "SAFE";
    verdictClass = "safe";
    confidence = 92;
  } else if (redFlags.length >= 3) {
    verdict = "SCAM";
    verdictClass = "scam";
    confidence = Math.min(70 + redFlags.length * 4, 99);
  } else if (redFlags.length >= 1) {
    verdict = "SUSPICIOUS";
    verdictClass = "warning";
    confidence = 55 + redFlags.length * 8;
  } else {
    verdict = "SAFE";
    verdictClass = "safe";
    confidence = 78;
  }

  // Investigation steps
  const steps = [
    {
      icon: "🔍",
      label: "PATTERN ANALYSIS",
      text: redFlags.length > 0
        ? `Detected ${redFlags.length} suspicious pattern(s). Key triggers: ${redFlags.slice(0, 2).join(", ")}.`
        : "No immediately suspicious patterns found in message structure.",
    },
    {
      icon: "🚨",
      label: "RED FLAGS DETECTED",
      text: redFlags.length > 0
        ? redFlags.map((f, i) => `${i + 1}. ${f}`).join(" | ")
        : "No red flags detected. Message follows legitimate communication patterns.",
    },
    {
      icon: "🔗",
      label: "URL / CONTACT SCAN",
      text: /http|www|\.com|\.in|\.xyz|\.net|\.top/i.test(message)
        ? "External link or domain detected. Scammers use lookalike domains — always verify before clicking."
        : "No external URLs or suspicious contact info detected.",
    },
    {
      icon: "🧠",
      label: "BEHAVIORAL ANALYSIS",
      text: redFlags.some(f => f.includes("Urgency"))
        ? "Classic psychological pressure tactic — creating urgency to override rational thinking. Legitimate organizations NEVER demand immediate action."
        : verdict === "SCAM"
        ? "Message uses social engineering tactics common in attacks targeting Indian users."
        : "No psychological manipulation tactics detected.",
    },
    {
      icon: "⚖️",
      label: "EVIDENCE SUMMARY",
      text: `Analysis complete. Found ${redFlags.length} red flag(s) and ${safeFlags.length} safe indicator(s). Confidence: ${confidence}%. Final verdict: ${verdict}.`,
    },
  ];

  // Actions
  let actions = "";
  if (verdict === "SCAM") {
    actions = `
      <li>Do NOT click any links or call any numbers in this message</li>
      <li>Block and report the sender immediately</li>
      <li>Report to National Cyber Crime Portal: <strong>cybercrime.gov.in</strong></li>
      <li>Call Cyber Crime Helpline: <strong>1930</strong></li>
      <li>Alert family members who may receive similar messages</li>
    `;
  } else if (verdict === "SUSPICIOUS") {
    actions = `
      <li>Do not respond or click any links until verified</li>
      <li>Contact the organization directly via their official website</li>
      <li>Never share OTP, passwords, or banking details</li>
      <li>When in doubt report to <strong>cybercrime.gov.in</strong></li>
    `;
  } else {
    actions = `
      <li>Message appears legitimate — stay cautious</li>
      <li>Never share OTP with anyone, even bank representatives</li>
      <li>Verify sender details if anything feels off</li>
    `;
  }

  // Save to database
  saveInvestigation(message, verdict, confidence, redFlags.length, ip);

  return { steps, verdict, confidence, verdictClass, actions };
}

module.exports = { investigateMessage };