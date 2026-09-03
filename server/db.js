const path = require("path");
const fs = require("fs");
const Database = require("better-sqlite3");

const dataDir = process.env.DATA_DIR || path.join(process.cwd(), "data");

// Make sure the directory exists
fs.mkdirSync(dataDir, { recursive: true });

const dbPath = path.join(dataDir, "essence.db");

const db = new Database(dbPath);

module.exports = db;
