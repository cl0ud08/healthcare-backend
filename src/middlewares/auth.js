const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');

/**
 * Middleware to authenticate JWT tokens.
 * Attaches the decoded user object to req.user if valid.
 * Returns 401 if no token is provided, 403 if token is invalid.
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

/**
 * Middleware to authorize admin users only.
 * Checks req.user.role and allows access if 'admin'.
 * Returns 403 if not authorized.
 */
function authorizeAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ error: 'Forbidden: Admins only' });
}

module.exports = {
  authenticateToken,
  authorizeAdmin,
};
