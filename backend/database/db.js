const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "aria.db"));

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS investigations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT NOT NULL,
    verdict TEXT NOT NULL,
    confidence INTEGER NOT NULL,
    red_flags INTEGER DEFAULT 0,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip_address TEXT
  );

  CREATE TABLE IF NOT EXISTS stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    total_scans INTEGER DEFAULT 0,
    total_scams INTEGER DEFAULT 0,
    total_suspicious INTEGER DEFAULT 0,
    total_safe INTEGER DEFAULT 0,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Initialize stats row if empty
const statsRow = db.prepare("SELECT * FROM stats WHERE id = 1").get();
if (!statsRow) {
  db.prepare("INSERT INTO stats (total_scans, total_scams, total_suspicious, total_safe) VALUES (0, 0, 0, 0)").run();
}

// Save investigation
function saveInvestigation(message, verdict, confidence, redFlagsCount, ip) {
  const stmt = db.prepare(`
    INSERT INTO investigations (message, verdict, confidence, red_flags, ip_address)
    VALUES (?, ?, ?, ?, ?)
  `);
  stmt.run(message.substring(0, 500), verdict, confidence, redFlagsCount, ip || "unknown");

  // Update stats
  db.prepare("UPDATE stats SET total_scans = total_scans + 1, last_updated = CURRENT_TIMESTAMP WHERE id = 1").run();

  if (verdict === "SCAM") {
    db.prepare("UPDATE stats SET total_scams = total_scams + 1 WHERE id = 1").run();
  } else if (verdict === "SUSPICIOUS") {
    db.prepare("UPDATE stats SET total_suspicious = total_suspicious + 1 WHERE id = 1").run();
  } else {
    db.prepare("UPDATE stats SET total_safe = total_safe + 1 WHERE id = 1").run();
  }
}

// Get stats
function getStats() {
  return db.prepare("SELECT * FROM stats WHERE id = 1").get();
}

// Get recent investigations
function getRecentInvestigations(limit = 10) {
  return db.prepare(`
    SELECT id, verdict, confidence, red_flags, timestamp
    FROM investigations
    ORDER BY timestamp DESC
    LIMIT ?
  `).all(limit);
}

// Get threat breakdown
function getThreatBreakdown() {
  return db.prepare(`
    SELECT verdict, COUNT(*) as count
    FROM investigations
    GROUP BY verdict
  `).all();
}

module.exports = { saveInvestigation, getStats, getRecentInvestigations, getThreatBreakdown };