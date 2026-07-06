// Authorization middleware — verifies admin role
const authorizeAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized — please log in' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden — admin role required' });
  }

  next();
};

module.exports = { authorizeAdmin };