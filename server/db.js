const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new Database(dbPath);

// Initialize Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT,
    location TEXT,
    start_date DATE,
    inspection_date DATE,
    participants TEXT,
    standards TEXT,
    material_id INTEGER,
    quantity REAL,
    status TEXT DEFAULT 'Pending'
  );

  CREATE TABLE IF NOT EXISTS materials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    standard TEXT,
    unit TEXT,
    supplier TEXT
  );

  CREATE TABLE IF NOT EXISTS templates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    file_path TEXT NOT NULL
  );
`);

// Mock Data
const insertTask = db.prepare(`
  INSERT INTO tasks (name, category, location, start_date, inspection_date, standards, status)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

const count = db.prepare('SELECT count(*) as count FROM tasks').get();
if (count.count === 0) {
  insertTask.run('Đổ bê tông dầm sàn tầng 5', 'Bê tông', 'Trục A-B, Cột 1-5', '2026-04-20', '2026-04-20', 'TCVN 4453:1995; TCVN 9340:2012', 'Pending');
  insertTask.run('Lắp dựng cốt thép vách hầm', 'Cốt thép', 'Khu vực B3', '2026-04-19', '2026-04-19', 'TCVN 4453:1995', 'Pending');
}

console.log('Database initialized successfully at:', dbPath);

module.exports = db;
