const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../config/db.config')

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const conn = await pool.getConnection();
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

exports.logoutUser = (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });

    res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: 'Logout successful' });
};

exports.updateUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const conn = await pool.getConnection();
        await conn.query(
            'UPDATE users SET name = ?, email = ? WHERE id = ?', 
            [name, email, req.userId]
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
