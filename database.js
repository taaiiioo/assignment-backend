const sqlite3 = require('sqlite3').verbose();

// Open the SQLite database
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create the users table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error('Error creating users table:', err.message);
    } else {
      console.log('Users table created or already exists.');
    }
  });
});

db.run(`
  CREATE TABLE IF NOT EXISTS user_settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    key TEXT NOT NULL,
    value TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
  )
`, (err) => {
  if (err) {
    console.error("Error creating user_settings table:", err.message);
  } else {
    console.log("user_settings table created or already exists.");
  }
});

// Export the database connection for use in other files
module.exports = db;