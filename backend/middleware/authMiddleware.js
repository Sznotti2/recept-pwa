const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const tokenFromCookie = req.cookies?.token; // Ellenőrizzük a sütiket is
  const token = authHeader ? authHeader.split(' ')[1] : tokenFromCookie; // Vagy fejlécből vagy sütiből vesszük a tokent
console.log(token);
  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    
    req.userId = decoded.id;
    next();
  });
};
