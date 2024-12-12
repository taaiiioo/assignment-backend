const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const readline = require('readline');

// Setup readline for command line input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Database connection
const db = new sqlite3.Database('./database.sqlite');

// Function to hash the password
function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

// Function to insert the user into the database
function insertUser(username, password) {
  const hashedPassword = hashPassword(password);

  // Insert user with hashed password
  db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function(err) {
    if (err) {
      console.log('Error inserting user:', err.message);
    } else {
      console.log(`User ${username} added successfully with hashed password.`);
    }
    rl.close();
  });
}

// Ask for username and password through command line
rl.question('Enter username: ', (username) => {
  rl.question('Enter password: ', (password) => {
    insertUser(username, password);
  });
});