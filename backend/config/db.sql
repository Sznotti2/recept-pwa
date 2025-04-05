CREATE TABLE Users (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	profile_picture VARCHAR(255) DEFAULT NULL,
	bio TEXT,                           -- Felhasználó bemutatkozása
	social_links JSON,                  -- Közösségi média linkek (pl. {"facebook": "url", "instagram": "url"})
	role ENUM('user', 'admin') DEFAULT 'user',
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB;

CREATE TABLE Recipes (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	image VARCHAR(255) NOT NULL,
	description TEXT NOT NULL,
	cook_time INT NOT NULL,
	servings INT NOT NULL,                          -- Adagok száma
	difficulty ENUM('easy', 'medium', 'hard') NOT NULL,
	ingredients JSON NOT NULL,						-- így egyszerűbb a tárolása
	slug VARCHAR(255) NOT NULL UNIQUE,              -- URL-barát azonosító
	average_rating DECIMAL(3,2) DEFAULT 0,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	user_id INT,
	FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE SET NULL		-- feéhasználó törlése esetén a recept ne vesszen el
) ENGINE = InnoDB;

CREATE TABLE Tags (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL UNIQUE
) ENGINE = InnoDB;

CREATE TABLE RecipeTags (
	recipe_id INT NOT NULL,
	tag_id INT NOT NULL,
	PRIMARY KEY (recipe_id, tag_id),
	FOREIGN KEY (recipe_id) REFERENCES Recipes(id) ON DELETE CASCADE,
	FOREIGN KEY (tag_id) REFERENCES Tags(id)
) ENGINE = InnoDB;

CREATE TABLE Instructions (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	recipe_id INT NOT NULL,
	step_order INT NOT NULL,         -- a lépések sorrendjének meghatározása
	instruction_text TEXT NOT NULL,
	FOREIGN KEY (recipe_id) REFERENCES Recipes(id) ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE InstructionImages (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	instruction_id INT NOT NULL,
	image VARCHAR(255) NOT NULL,     -- a lépéshez tartozó kép elérési útja vagy URL-je
	FOREIGN KEY (instruction_id) REFERENCES Instructions(id) ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE Blogs (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	author_id INT,
	title VARCHAR(255) NOT NULL,
	description TEXT NOT NULL,
	image VARCHAR(255) NOT NULL,
	slug VARCHAR(255) NOT NULL UNIQUE,
	content JSON NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (author_id) REFERENCES Users(id) ON DELETE SET NULL
) ENGINE = InnoDB;

CREATE TABLE Comments (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	parent_id INT NOT NULL,              -- A recept vagy blog azonosítója, amire a komment vonatkozik
	comment_type ENUM('recipe', 'blog') NOT NULL,
	user_id INT NOT NULL,                -- A kommentet író felhasználó azonosítója
	parent_comment_id INT DEFAULT NULL,  -- Szülő komment azonosítója, ha válasz egy meglévő kommentre
	comment_text TEXT NOT NULL,          -- A komment tartalma
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
	FOREIGN KEY (parent_comment_id) REFERENCES Comments(id) ON DELETE CASCADE
) ENGINE = InnoDB;

INSERT INTO Blogs (user_id, title, description, image, slug, content) VALUES
	(2, "Első blogom", "Leírás az leső blogomról", "path_to_image", "elso-blogom", *);

*{
	"sections": [
		{
			"type": "header",
			"level": 2,
			"text": "some title",
		},
		{
			"type": "paragraph",
			"text": "Lorem ipsum dolor sit amet"
		},
		{
			"type": "image",
			"source": "path-to-img",
			"caption": "Csokitorta"
		},
		{
			"type": "gallery",
			"images": [
				{
					"source": "path-to-img",
					"caption": "kép 1"
				},
				{
					"source": "path-to-img",
					"caption": "kép 2"
				},
				{
					"source": "path-to-img",
					"caption": "kép 3"
				},
			]
		}
	]
}


INSERT INTO Users (name, email, password, role, language_id) -- minden adatot megadva
VALUES 
	('Admin Árni', 'admin@email.com', 'admin', 'admin', 1),
	('Teszt Elek', 'anna@email.com', 'user1', 'user', 1),
INSERT INTO Users (name, email, password, language_id) -- rövidített változat
VALUES 
	('Minden Áron', 'peter@email.com', 'user2', 2);


INSERT INTO Recipes (name, image, description, cook_time, servings, difficulty, ingerdients, slug, user_id) VALUES
	("Egyszerű dobostorta", "path_to_image", "Legírás a dobostortaról, 2-3 mondat", 30, 4, "medium", {
			"ingredients": [
				{
					"title": "piskóta",
					"ingredients": [
						"tej 3 dl",
						"cukor 1 evőkanál",
						"só 2 csipet",
						"minden földi jó"
					]
				},
				{
					"title": "krém",
					"ingredients": [
						"ketchup 4 üveg"
					]
				},
				
			]
		}, "egyszeru-dobostorta", 2);


INSERT INTO Tags (name) VALUES
	("torta"),
	("csokis"),
	("tavaszi"),
	("nyári"),
	("őszi"),
	("téli"),
	("bármikor");

INSERT INTO RecipeTags (recipe_id, tag_id) VALUES
	(1, 1),
	(1, 2),
	(1, 7);

INSERT INTO Instructions (recipe_id, step_order, instruction_text) VALUES
	(1, 1, "Tisztítsuk meg a munkaterületet"),
	(1, 2, "Készítsük el a piskótát"),
	(1, 3, "Most jön a krém, a krémek krémje"),
	(1, 4, "stb...");

INSERT INTO InstructionImages (instruction_id, image) VALUES
	(2, "path_to_image"),
	(2, "path_to_image"),
	(2, "path_to_image"),
	(3, "path_to_image"),
	(3, "path_to_image"),
	(3, "path_to_image");

INSERT INTO Comments (parent_id, comment_type, user_id, parent_comment_id, comment_text) VALUES
	(1, "recipe", 2, NULL, "Első komment");

