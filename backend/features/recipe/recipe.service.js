const pool = require("../../config/db.config");

exports.createRecipe = async (req, res) => {
	let conn;
	try {
		let { name, image, description, cookTime, servings, difficulty, ingredients, slug, instructions, tags } = req.body;

		if (typeof ingredients !== 'string') {
			ingredients = JSON.stringify(ingredients);  // Ha nem string, alakítsuk át JSON formátummá
		}

		// Hibakezelés
		/*
		if (!name || !image || !description || !cookTime || !servings || !difficulty || !ingerdients || !slug) {
			return res.status(400).json({ error: 'All fields are required!' });
		}
		*/
		cookTime = parseInt(cookTime);
		servings = parseInt(servings);
		if (Number.isNaN(cookTime) || Number.isNaN(servings)) return res.status(400).json({ error: 'Cook time and servings must be a number!', "cookTime": cookTime, "typoeOf": typeof cookTime });

		conn = await pool.getConnection();
		const result = await conn.query(
			'INSERT INTO Recipes (name, image, description, cook_time, servings, difficulty, ingredients, slug, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
			[name, image, description, cookTime, servings, difficulty, ingredients, slug, req.userId]
		);

		createTags(result.insertId, tags);	// result.insertId: az utolsó beszúrt sor azonosítója (ID)
		createInstructions(result.insertId, instructions);

		res.status(201).json({ message: 'Recipe created successfully!' });
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			res.status(400).json({ error: error.message });
		} else {
			res.status(500).json({ error: "Internal server error" });
		}
	} finally {
		if (conn) conn.release();
	}
}

const createTags = async (recipeId, tags) => {
	let conn;
	try {
		conn = await pool.getConnection();
		for (let tag of tags) {
			tag = tag.toLowerCase();
			const rows = await conn.query('SELECT * FROM Tags WHERE name = ?', [tag]);
			if (rows.length === 0) { // ha még nem létezik az adott cimke
				const result = await conn.query('INSERT INTO Tags (name) VALUES (?)', [tag]);
				await conn.query('INSERT INTO RecipeTags (recipe_id, tag_id) VALUES (?, ?)', [recipeId, result.insertId]);
			} else { // ha létezik, csak a kapcsolatot kell létrehozni
				await conn.query('INSERT INTO RecipeTags (recipe_id, tag_id) VALUES (?, ?)', [recipeId, rows[0].id]);
			}
		}
	} catch (error) {
		throw error;
	} finally {
		if (conn) conn.release();
	}
}

const createInstructions = async (recipeId, instructions) => {
	let conn;
	try {
		conn = await pool.getConnection();
		// await conn.beginTransaction(); //TODO: nézz utána mit csinál

		for (let i = 0; i < instructions.length; i++) {
			const { text, images } = instructions[i];

			const result = await conn.query(
				"INSERT INTO Instructions (recipe_id, step_order, instruction_text) VALUES (?, ?, ?)",
				[recipeId, i, text]
			);

			// ha vannak képek
			if (images && images.length > 0) {
				for (let image of images) {
					if (image) { // nem üres string esetén
						await conn.query(
							"INSERT INTO InstructionImages (instruction_id, image) VALUES (?, ?)",
							[result.insertId, image]
						);
					}
				}
			}
		}

		// await conn.commit(); //TODO: nézz utána mit csinál
		console.log("Minden instruction beszúrva");
	} catch (error) {
		if (conn) await conn.rollback(); //TODO: nézz utána mit csinál
		console.error("Hiba történt az instrukciók beszúrásakor:", error);
		throw error;
	} finally {
		if (conn) conn.release();
	}
};


/*
const createInstructions = async (recipeId, instructions) => {
	let conn;
	try {
		conn = await pool.getConnection();

		console.log("createInstructions instructions: ", instructions);

		for (let i=0; i < instructions.length; i++) {
			let result = await conn.query(
				'INSERT INTO Instructions (recipe_id, step_order, instruction_text) VALUES (?, ?, ?)',
				[recipeId, i, instructions[i].text]
			);
			console.log(`Beszúrtuk a(z) ${i}. elemet:`, result);

			for (let image of instructions[i].images) {
				if (image !== '') {
					await conn.query(
						'INSERT INTO InstructionImages (instruction_id, image) VALUES (?, ?)',
						[result.insertId, image]
					);
				}
			}
		}
	} catch (error) {
		throw error;
	} finally {
		if (conn) conn.release();
	}
}
*/

exports.getAllRecipes = async (req, res) => {
	let conn;
	try {
		conn = await pool.getConnection();
		const rows = await conn.query('SELECT * FROM Recipes');
		res.status(200).json({ rows: rows });
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			res.status(400).json({ error: error.message });
		} else {
			res.status(500).json({ error: "Internal server error" });
		}
	} finally {
		if (conn) conn.release();
	}
}

exports.getRecipeById = async (req, res) => {
	let conn;
	try {
		const id = req.params.id;
		conn = await pool.getConnection();
		const rows = await conn.query('SELECT * FROM Recipes WHERE id = ?', [id]);
		res.status(500).json({ rows: rows[0] });
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			res.status(400).json({ error: error.message });
		} else {
			res.status(500).json({ error: "Internal server error" });
		}
	} finally {
		if (conn) conn.release();
	}

}

exports.updateRecipe = async (req, res) => {
	try {
		const conn = await pool.getConnection();
		try {
			const recipeId = req.params.id;
			const recipe = { name, image, description, cookTime, servings, difficulty, ingerdients, slug, instructions, tags } = req.body;

			const result = await conn.query(
				'UPDATE Recipes SET name = ?, image = ?, description = ?, cook_time = ?, servings = ?, difficulty = ?, ingerdients = ?, slug = ? WHERE id = ?',
				[recipe.name, recipe.image, recipe.description, recipe.cookTime, recipe.servings, recipe.difficulty, recipe.ingerdients, recipe.slug, recipeId]
			);

			updateTags(result.insertId, recipe.tags);
			updateInstructions(result.insertId, recipe.instructions);

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

const updateTags = async (recipeId, tags) => {
	try {
		const conn = await pool.getConnection();

		try {
			// TODO: optimálisabb törlési stratégia kiválasztása
			// get all tags for the recipe
			const oldTags = await conn.query('SELECT * FROM Tags, RecipeTags WHERE Tags.id = RecipeTags.tag_id AND RecipeTags.recipe_id = ?', [recipeId]);

			// delete connection if the tag is not in the new tags
			for (let oldTag of oldTags) {
				if (!tags.includes(oldTag.name)) {
					await conn.query('DELETE FROM RecipeTags WHERE recipe_id = ? AND tag_id = ?', [recipeId, oldTag.tag_id]);
				}
			}
			// add new tags and create connection
			for (let tag of tags) {
				tag = tag.toLowerCase();
				if (!oldTags.includes(tag)) {
					const rows = await conn.query('SELECT * FROM Tags WHERE name = ?', [tag]);
					if (rows.length === 0) { // ha még nem létezik az adott cimke
						const result = await conn.query('INSERT INTO Tags (name) VALUES (?)', [tag]);
						await conn.query('INSERT INTO RecipeTags (recipe_id, tag_id) VALUES (?, ?)', [recipeId, result.insertId]);
					} else { // ha létezik, csak a kapcsolatot kell létrehozni
						await conn.query('INSERT INTO RecipeTags (recipe_id, tag_id) VALUES (?, ?)', [recipeId, rows[0].id]);
					}
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

const updateInstructions = async (recipeId, instructions) => {
	try {
		const conn = await pool.getConnection();

		try {
			// TODO: optimálisabb törlési stratégia kiválasztása
			await conn.query('DELETE FROM Instructions WHERE recipe_id = ?', [recipeId]);
			// ON DELETE CASCADE miatt a kapcsolódó képek is törlődnek

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

