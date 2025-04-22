const pool = require("../../config/db.config");

exports.createBlog = async (req, res) => {
	let conn;

	try {
		const { title, description, image, slug, content, status, meta_description } = req.body;

		// Hibakezelés
		if (!title || !description || !image || !slug) {
			return res.status(400).json({ error: 'Please provide all required fields!' });
		}

		conn = await pool.getConnection();
		await conn.query(
			'INSERT INTO Blogs (author_id, title, description, image, slug, content, status, meta_description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
			[req.userId, title, description, image, slug, content, status, meta_description]
		);

		res.status(201).json({ message: 'Blog created successfully!' });
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

exports.getAllBlogs = async (req, res) => {
	try {
		let conn;

		try {
			conn = await pool.getConnection();
			const rows = await conn.query('SELECT * FROM Blogs');
			res.status(201).json({ "rows": rows });
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
exports.getBlogById = async (req, res) => {
	try {
		let conn;

		try {
			const id = req.params.id;

			conn = await pool.getConnection();
			const rows = await conn.query('SELECT * FROM Blogs WHERE id = ?', [id]);

			if (rows.length === 0) {
				return res.status(404).json({ error: 'Blog not found!' });
			}
			res.status(201).json({ "rows": rows });
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
exports.getBlogBySlug = async (req, res) => {
	try {
		let conn;

		try {
			const slug = req.params.slug;

			conn = await pool.getConnection();
			const rows = await conn.query('SELECT * FROM Blogs WHERE slug = ?', [slug]);

			if (rows.length === 0) {
				return res.status(404).json({ error: 'Blog not found!' });
			}
			res.status(201).json({ "row": rows[0] });
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

exports.updateBlog = async (req, res) => {
	try {
		const conn = await pool.getConnection();

		try {
			const blogId = req.params.id;
			const { title, description, image, slug, content } = req.body;

			// Hibakezelés
			if (!title || !description || !image || !slug || !content) {
				return res.status(400).json({ error: 'Please provide all required fields!' });
			}

			await conn.query(
				'UPDATE Blogs SET title = ?, description = ?, image = ?, slug = ?, content = ? WHERE id = ?',
				[title, description, image, slug, content, blogId]
			);

			res.status(201).json({ message: 'Blog updated successfully!' });
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

exports.deleteBlog = async (req, res) => {
	try {
		const conn = await pool.getConnection();

		try {
			const blogId = req.params.id;
			await conn.query('DELETE FROM Blogs WHERE id = ?', [blogId]);

			res.status(201).json({ message: 'Blog deleted!' });
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
