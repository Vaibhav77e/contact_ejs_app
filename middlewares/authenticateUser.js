const jwt = require('jsonwebtoken');

// Example middleware for authentication
function authenticateUser(req, res, next) {
  // Perform authentication logic, e.g., verify username and password
  const user = authenticate(req.body.username, req.body.password);

  if (!user) {
    return res.status(401).json({ error: 'Authentication failed' });
  }

  // Generate token
  const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });

  // Set token in response header or send it in response body
  res.locals.token = token; // Set token in response locals to be used in the view
  storeToken(token);
  next();
}


// Example function to store token in local storage
function storeToken(token) {
  localStorage.setItem('token', token);
}


module.exports = authenticateUser;
