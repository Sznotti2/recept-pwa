const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../../config/db.config');

exports.registerUser = async (req, res) => {
	let conn;
	try {
		const { name, email, password, password2 } = req.body;
		// Hibakezelés
		if (!name || !email || !password || !password2) return res.status(400).json({ error: 'All fields are required' });

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) return res.status(400).json({ error: 'Invalid email format' });

		if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters long' });
		if (password !== password2) return res.status(400).json({ error: 'Passwords do not match' });
		// Ha a jelszó nem tartalmaz legalább egy számot, hibát dobunk
		if (!/\d/.test(password)) return res.status(400).json({ error: 'Password must contain at least one number' });
		// Ha a felhasználó már létezik, hibát dobunk
		conn = await pool.getConnection();
		let rows = await conn.query('SELECT * FROM Users WHERE email = ?', [email]);
		if (rows.length > 0) return res.status(400).json({ error: 'Email already exists' });
		rows = await conn.query('SELECT * FROM Users WHERE name = ?', [name]);
		if (rows.length > 0) return res.status(400).json({ error: 'Username already exists' });

		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(password, salt);
		await conn.query(
			'INSERT INTO Users (name, email, password) VALUES (?, ?, ?)',
			[name, email, hashedPassword]
		);
		res.status(201).json({ message: 'User registered successfully' });
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			res.status(400).json({ error: error.message });
		} else {
			res.status(500).json({ error: "Internal server error" });
		}
	} finally {
		if (conn) conn.release();
	}
};

exports.loginUser = async (req, res) => {
	let conn;
	try {
		const { email, password } = req.body;

		// Hibakezelés 
		if (!email || !password) return res.status(400).json({ error: 'All fields are required' });

		conn = await pool.getConnection();
		let rows = await conn.query(
			'SELECT * FROM Users WHERE email = ? OR name = ?',
			[email, email]
		);

		if (rows.length === 0 || !(await bcrypt.compare(password, rows[0].password))) {
			return res.status(401).json({ error: 'Invalid credentials' });
		}

		const token = jwt.sign(
			{ id: rows[0].id },
			process.env.JWT_SECRET,
			{ expiresIn: process.env.JWT_EXPIRES_IN/*, algorithm: 'RS256'*/ }
		);

		// Beállítjuk a sütit
		res.cookie('token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production', // Csak HTTPS esetén érvényes
			sameSite: 'Lax',	// különböző portok miatt Lax
			maxAge: 7 * 24 * 60 * 60 * 1000 // 7 nap
		});

		res.json({ user: { name: rows[0].name, email: rows[0].email, profile_picture: rows[0].profile_picture } });
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			res.status(400).json({ error: error.message });
		} else {
			res.status(500).json({ error: "Internal server error" });
		}
	} finally {
		if (conn) conn.release();
	}
};

exports.refreshToken = async (req, res) => {
	let conn;
	try {
		const token = req.cookies.token;
		if (!token) return res.status(401).json({ error: 'No token provided' });

		jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
			if (err) {
				res.clearCookie('token');
				return res.status(403).json({ error: 'Unauthorized' });
			}
			conn = await pool.getConnection();
			const rows = await conn.query('SELECT * FROM Users WHERE id = ?', [decoded.id]);
			if (rows.length === 0) return res.status(404).json({ error: 'User not found' });

			const newToken = jwt.sign(
				{ id: rows[0].id },
				process.env.JWT_SECRET,
				{ expiresIn: process.env.JWT_EXPIRES_IN }
			);

			res.cookie('token', newToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'Lax',
				maxAge: 7 * 24 * 60 * 60 * 1000 // 7 nap
			});

			res.json({ message: "New refresh token was sent" });
		});
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			res.status(500).json({ error: error.message });
		} else {
			res.status(500).json({ error: "Internal server error" });
		}
	} finally {
		if (conn) conn.release();
	}
}

exports.getUserData = async (req, res) => {
	let conn;
	try {
		// Lekérjük a felhasználó adatait az adatbázisból az ID alapján, ami a tokenben van
		conn = await pool.getConnection();
		const rows = await conn.query('SELECT name, email, profile_picture, bio, social_links, role FROM Users WHERE id = ?', [req.userId]);

		if (rows.length === 0) {
			return res.status(404).json({ error: 'User not found' });
		}

		// Ha minden rendben van, visszaküldjük a felhasználói adatokat
		res.status(200).json({ user: rows[0] });
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			res.status(400).json({ error: error.message });
		} else {
			res.status(500).json({ error: "Internal server error" });
		}
	} finally {
		conn.release();
	}
}

exports.logoutUser = (req, res) => {
	// Töröljük a sütit, így a kliens már nem fogja elküldeni a további kérések során
	res.clearCookie('token', {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'Strict'
	});

	res.status(200).json({ message: 'Logout successful' });
};

exports.updateUser = async (req, res) => {
	let conn;
	try {
		const { name, password, bio, profilePicture } = req.body;
		conn = await pool.getConnection();

		// hibakezelés
		const rows = await conn.query('SELECT * FROM Users WHERE id = ?', [req.userId]);
		if (rows.length === 0 || !(await bcrypt.compare(password, rows[0].password))) {
			return res.status(401).json({ error: 'Invalid credentials' });
		}

		await conn.query(
			'UPDATE Users SET name = ?, profile_picture = ?, bio = ? WHERE id = ?',
			[name, profilePicture, bio, req.userId]
		);
		res.json({ message: 'User updated successfully' });
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			res.status(400).json({ error: error.message });
		} else {
			res.status(500).json({ error: "Internal server error" });
		}
	} finally {
		if (conn) conn.release();
	}
};

exports.deleteUser = async (req, res) => {
	let conn;
	try {
		conn = await pool.getConnection();
		await conn.query(
			'DELETE FROM Users WHERE id = ?',
			[req.userId]
		);

		res.clearCookie('token', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'Lax'
		});
		res.json({ message: 'User deleted' });
	} catch (error) {
		res.clearCookie('token', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'Lax'
		});
		if (process.env.NODE_ENV === 'development') {
			res.status(400).json({ error: error.message });
		} else {
			res.status(500).json({ error: "Internal server error" });
		}
	} finally {
		if (conn) conn.release();
	}
};

exports.getUserById = async (req, res) => {
	let conn;
	try {
		conn = await pool.getConnection();
		const rows = await conn.query('SELECT name, email, profile_picture, bio, social_links, role FROM Users WHERE id = ?', [req.params.id]);

		if (rows.length === 0) {
			return res.status(404).json({ message: 'User not found' });
		}

		// Ha minden rendben van, visszaküldjük a felhasználói adatokat
		res.status(200).json({ row: rows[0] });
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			res.status(400).json({ message: error.message });
		} else {
			res.status(500).json({ message: "Internal server error" });
		}
	} finally {
		conn.release();
	}
}