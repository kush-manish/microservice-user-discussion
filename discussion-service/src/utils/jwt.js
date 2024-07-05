const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key';

function generateToken(userId) {
  const expiresIn = '1h';
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn });
  return { token, expiresIn };
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.userId = user.userId;
    next();
  });
}

module.exports = { generateToken, authenticateToken };
