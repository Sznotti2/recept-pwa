const pool = require("../../config/db.config");


exports.createRecipe = async (req, res) => {
    try {
        const conn = await pool.getConnection();

        try {
            const recipe = { name, image, description, cookTime, servings, difficulty, ingerdients, slug, instructions, tags } = req.body;

            // Hibakezelés
            if (!recipe.name || !recipe.image || !recipe.description || !recipe.cookTime || !recipe.servings || !recipe.difficulty || !recipe.ingerdients || !recipe.slug) {
                return res.status(400).json({ error: 'All fields are required!' });
            }
            cookTime = parseInt(cookTime);
            servings = parseInt(servings);
            if (Number.isNaN(cookTime) || Number.isNaN(servings)) return res.status(400).json({ error: 'Cook time and servings must be a number!', "cookTime": cookTime, "typoeOf": typeof cookTime });

            const result = await conn.query(
                'INSERT INTO Recipes (name, image, description, cook_time, servings, difficulty, ingerdients, slug, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [recipe.name, recipe.image, recipe.description, recipe.cookTime, recipe.servings, recipe.difficulty, recipe.ingerdients, recipe.slug, req.userId]
            );

            createTags(result.insertId, recipe.tags);
            createInstructions(result.insertId, recipe.instructions); // result.insertId: az utolsó beszúrt sor azonosítója (ID)

            res.status(201).json({ message: 'Recipe created successfully!' });
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

const createTags = async (recipeId, tags) => {
	try {
		const conn = await pool.getConnection();

		try {
			for (let tag of tags) {
				tag = tag.toLowerCase();
				const rows = await conn.query('SELECT * FROM Tags WHERE name = ?', [tag]);
				if (rows.length === 0) { // ha még nem létezik az adott cimke
					const result = await conn.query('INSERT INTO Tags (name) VALUES (?)', [tag]);
					await conn.query('INSERT INTO RecipeTags (recipe_id, tag_id) VALUES (?, ?)', [recipeId, result.insertId]);					
				} else {
					await conn.query('INSERT INTO RecipeTags (recipe_id, tag_id) VALUES (?, ?)', [recipeId, rows[0].id]);
				}
			}
		} catch (error) {
			throw error;
		} finally {
			conn.release();
		}
	} catch (error) {
		throw error;
	}
}

const createInstructions = async (recipeId, instructions) => {
    try {
        const conn = await pool.getConnection();

        try {
            for (let instruction of instructions) {
                const result = await conn.query(
                    'INSERT INTO Instructions (recipe_id, step_order, instruction_text) VALUES (?, ?, ?)',
                    [recipeId, instruction.stepOrder, instruction.instructionText]
                );

                for (let image of instruction.images) {
                    await conn.query(
                        'INSERT INTO InstructionImages (instruction_id, image) VALUES (?, ?)',
                        [result.insertId, image]
                    );
                }
            }
        } catch (error) {
            throw error;
        } finally {
            conn.release();
        }
    } catch (error) {
        throw error;
    }
}

exports.getAllRecipes = async (req, res) => {
    try {
        const conn = await pool.getConnection();

        try {
            const rows = await conn.query('SELECT * FROM Recipes');
            res.status(200).json({ rows: rows });
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

exports.getRecipeById = async (req, res) => {
    try {
        const conn = await pool.getConnection();
        try {
            const id = req.params.id;
            const rows = await conn.query('SELECT * FROM Recipes WHERE id = ?', [id]);
            res.status(500).json({ rows: rows[0] });
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

exports.updateRecipe = async (req, res) => {
    try {
        const conn = await pool.getConnection();
        try {
            const recipeId = req.params.id;
            const recipe = { name, image, description, cookTime, servings, difficulty, ingerdients, slug } = req.body;
            await conn.query(
                'UPDATE Recipes SET name = ?, image = ?, description = ?, cook_time = ?, servings = ?, difficulty = ?, ingerdients = ?, slug = ? WHERE id = ?',
                [recipe.name, recipe.image, recipe.description, recipe.cookTime, recipe.servings, recipe.difficulty, recipe.ingerdients, recipe.slug, recipeId]
            );
            res.status(201).json({ message: 'Recipe updated!' });
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

exports.deleteRecipe = async (req, res) => {
    try {
        const conn = await pool.getConnection();
     
        try {
            const id = req.params.id;
            await conn.query('DELETE FROM Recipes WHERE id = ?', [id]);
            res.status(201).json({ message: 'Recipe deleted!' });
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

exports.searchRecipe = async (req, res) => {
    try {
        const conn = await pool.getConnection();

        try {
            const search = req.query.search;
            const rows = await conn.query('SELECT * FROM Recipes WHERE name LIKE ?', [`%${search}%`]);
            res.status(201).json({ recipes: rows });
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

