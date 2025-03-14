const pool = require("../../config/db.config");

exports.createBlog = async (req, res) => {
    try {
        const conn = await pool.getConnection();

        try {
            const { title, description, image, slug, content } = req.body;

            // Hibakezelés
            if (!title || !description || !image || !slug || !content) {
                return res.status(400).json({ error: 'Please provide all required fields!' });
            }

            await conn.query(
                'INSERT INTO Blogs (user_id, title, description, image, slug, content) VALUES (?, ?, ?, ?, ?, ?)',
                [req.userId, title, description, image, slug, content]
            );

            res.status(201).json({ message: 'Blog created successfully!' });
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

exports.getAllBlogs = async (req, res) => {
    try {
        const conn = await pool.getConnection();

        try {
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
