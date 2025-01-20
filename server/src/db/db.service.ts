import Database from 'better-sqlite3';

const db = new Database('app.db');

const initializeDatabase = () => {
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    amount REAL NOT NULL,
    currency TEXT NOT NULL,
    category TEXT NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`;
  db.prepare(createTableQuery).run();
};

initializeDatabase();

export default db;
