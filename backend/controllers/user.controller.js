const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../config/db.config')

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, password2 } = req.body;

        // Hibakezelés
        if (!email) return res.status(400).json({ error: 'Email is required' });
        if (!password) return res.status(400).json({ error: 'Password is required' });
        if (!password2) return res.status(400).json({ error: 'Verification password is required' });
        if (password !== password2) return res.status(400).json({ error: 'Passwords do not match' });
        // Ha a jelszó nem tartalmaz legalább 6 karaktert, hibát dobunk
        if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters long' });
        // Ha a jelszó nem tartalmaz legalább egy számot, hibát dobunk
        if (!/\d/.test(password)) return res.status(400).json({ error: 'Password must contain at least one number' });
        // Ha a felhasználó már létezik, hibát dobunk
        const conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length > 0) return res.status(400).json({ error: 'Email already exists' });
        rows = await conn.query('SELECT * FROM users WHERE name = ?', [name]);
        if (rows.length > 0) return res.status(400).json({ error: 'Username already exists' }); 
        conn.release();

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        conn = await pool.getConnection();
        await conn.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );
        conn.release();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Hibakezelés 
        if (!email) return res.status(400).json({ error: 'Email is required' });
        if (!password) return res.status(400).json({ error: 'Password is required' });

        const conn = await pool.getConnection();
        const rows = await conn.query(
            'SELECT * FROM users WHERE email = ?', 
            [email]
        );
        conn.release();
        if (rows.length === 0 || !(await bcrypt.compare(password, rows[0].password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Beállítjuk a sütit
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Csak HTTPS esetén érvényes
            sameSite: 'Strict',
            maxAge: 60 * 60 * 1000 // 1 óra
        });

        res.json({ token, user: { id: rows[0].id, name: rows[0].name, email: rows[0].email } });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.checkUserStatus = async (req, res) => {
    try {
        // A token kinyerése: először a sütiből, majd a header-ből
        const token = req.cookies.token || req.headers['authorization'];
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        // Ha a token a Bearer scheme-ben érkezik, eltávolítjuk a "Bearer " részt
        const actualToken = token.startsWith('Bearer ') ? token.slice(7) : token;

        // Token ellenőrzése. Ha érvénytelen, a jwt.verify hibát dob, amit a catch ágban kezelünk.
        const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

        // Lekérjük a felhasználó adatait az adatbázisból az ID alapján, ami a tokenben van
        const conn = await pool.getConnection();
        const rows = await conn.query('SELECT id, name, email FROM users WHERE id = ?', [decoded.id]);
        conn.release();

        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Ha minden rendben van, visszaküldjük a felhasználói adatokat
        res.status(200).json({ user: rows[0] });
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

exports.logoutUser = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

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
        const { name, email, profilePicture, bio } = req.body;
        const conn = await pool.getConnection();
        await conn.query(
            'UPDATE users SET name = ?, email = ?, profile_picture = ?, bio = ? WHERE id = ?', 
            [name, email, profilePicture, bio, req.userId]
        );
        conn.release();
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const conn = await pool.getConnection();
        await conn.query(
            'DELETE FROM users WHERE id = ?', 
            [req.userId]
        );
        conn.release();
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
