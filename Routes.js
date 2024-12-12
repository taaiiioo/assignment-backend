router.post('/login', (req, res) => {
	const { username, password } = req.body;
  
	if (!username || !password) {
	  return res.status(400).json({ message: 'Username and password are required.' });
	}
  
	// Query the database to find the user
	const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
	db.get(query, [username, password], (err, user) => {
	  if (err) {
		console.error('Error querying database:', err.message);
		return res.status(500).json({ message: 'Internal server error.' });
	  }
  
	  if (user) {
		res.status(200).json({ message: 'Login successful.', user: { id: user.id, username: user.username } });
	  } else {
		res.status(401).json({ message: 'Invalid username or password.' });
	  }
	});
  });
  
  
  module.exports = router;