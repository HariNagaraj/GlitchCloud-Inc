const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access Denied: No Token Provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Session Expired or Invalid Token' });
    req.user = user;
    next();
  });
};

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.roleTier)) {
      return res.status(403).json({ 
        error: `Restricted Access: Requires ${allowedRoles.join(' or ')} level clearance.` 
      });
    }
    next();
  };
};

module.exports = { authenticateToken, authorizeRoles };
