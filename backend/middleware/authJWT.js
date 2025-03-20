const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
	try {
		let token = req.cookies.token;
		if (!token) {
			return res.status(403).send({
				message: "No token provided!"
			});
		}

		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err) {
				return res.status(401).send({
					message: "Unauthorized!"
				});
			}
			req.userId = decoded.id; // A request objektum bővítése a felhasználó azonosítójával
			next(); // A következő middleware vagy handler futtatása
		});
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			res.status(400).json({ error: error.message });
		} else {
			res.status(500).json({ error: "Internal server error" });
		}
	}
};

module.exports = verifyToken;
