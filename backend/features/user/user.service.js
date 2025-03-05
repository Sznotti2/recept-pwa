const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../../config/db.config');

exports.registerUser = async (req, res) => {
	try {
		const conn = await pool.getConnection();
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
			let rows = await conn.query('SELECT * FROM users WHERE email = ?', [email]);
			if (rows.length > 0) return res.status(400).json({ error: 'Email already exists' });
			rows = await conn.query('SELECT * FROM users WHERE name = ?', [name]);
			if (rows.length > 0) return res.status(400).json({ error: 'Username already exists' }); 
	
			const salt = await bcrypt.genSalt(10)
			const hashedPassword = await bcrypt.hash(password, salt);
			await conn.query(
				'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
				[name, email, hashedPassword]
			);
			res.status(201).json({ message: 'User registered successfully' });
		} catch (error) {
			throw error; // "kidobjuk" a hibát, hogy a külső catch ág kapja el és csak 1 helyen kelljen kezelni
		} finally {
			conn.release();
		}
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			res.status(400).json({ error: error.message });
		} else {
			res.status(500).json({ error: "Internal server error" });
		}
	}
};

exports.loginUser = async (req, res) => {
	try {
		const conn = await pool.getConnection();

		try {
			const { email, password } = req.body;
	
			// Hibakezelés 
			if (!email || !password) return res.status(400).json({ error: 'All fields are required' });

			//TODO: Email és felhasználónév is be lehet jelentkezni
			let rows = await conn.query(
				'SELECT * FROM users WHERE email = ?',
				[email]
			);

			if (rows.length === 0 || !(await bcrypt.compare(password, rows[0].password))) {
				return res.status(401).json({ error: 'Invalid credentials' });
			}
			const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
	
			// Beállítjuk a sütit
			res.cookie('token', token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production', // Csak HTTPS esetén érvényes
				sameSite: 'Strict',
				maxAge: 60 * 60 * 1000 // 1 óra
			});
	
			res.json({ token, user: { id: rows[0].id, name: rows[0].name, email: rows[0].email } });
		} catch (error) {
			throw error;
		} finally {
			conn.release();
		}
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			res.status(400).json({ error: error.message });
		} else {
			res.status(500).json({ error: "Internal server error" });
		}
	}
};

exports.checkUserStatus = async (req, res) => {
	try {
		const conn = await pool.getConnection();

		try {
			// Lekérjük a felhasználó adatait az adatbázisból az ID alapján, ami a tokenben van
			const rows = await conn.query('SELECT * FROM users WHERE id = ?', [req.userId]);
			conn.release();
	
			if (rows.length === 0) {
				return res.status(404).json({ error: 'User not found' });
			}
	
			// Ha minden rendben van, visszaküldjük a felhasználói adatokat
			res.status(200).json({ user: rows[0] });
		} catch (error) {
			throw error;
		} finally {
			conn.release();
		}
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			res.status(400).json({ error: error.message });
		} else {
			res.status(500).json({ error: "Internal server error" });
		}
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
	try {
		const conn = await pool.getConnection();

		try {
			const { name, profilePicture, bio } = req.body;
			await conn.query(
				'UPDATE users SET name = ?, profile_picture = ?, bio = ? WHERE id = ?',
				[name, profilePicture, bio, req.userId]
			);
			res.json({ message: 'User updated successfully' });
		} catch (error) {
			throw error;
		} finally {
			conn.release();
		}
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			res.status(400).json({ error: error.message });
		} else {
			res.status(500).json({ error: "Internal server error" });
		}
	}
};

exports.deleteUser = async (req, res) => {
	try {
		const conn = await pool.getConnection();
		try {
			await conn.query(
				'DELETE FROM users WHERE id = ?',
				[req.userId]
			);
			res.json({ message: 'User deleted' });
		} catch (error) {
			throw error;
		} finally {
			res.clearCookie('token', {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'Strict'
			});
	
			conn.release();
		}
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			res.status(400).json({ error: error.message });
		} else {
			res.status(500).json({ error: "Internal server error" });
		}
	}
};
