const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "../data");

fs.mkdirSync(DATA_DIR, { recursive: true });
