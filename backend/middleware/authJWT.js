const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
  let token = req.cookies.token || req.headers['authorization'];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  // Ha a token a Bearer Authorization fejlécben érkezik
  if (token.startsWith("Bearer")) {
    token = token.split(" ")[1];
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};


module.exports = verifyToken;
