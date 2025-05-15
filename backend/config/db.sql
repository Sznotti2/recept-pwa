CREATE TABLE Users (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	profile_picture TEXT DEFAULT NULL,
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
	description TEXT,
	image VARCHAR(255) NOT NULL,
	slug VARCHAR(255) NOT NULL UNIQUE,
	status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    meta_description VARCHAR(255),		-- SEO szempontból hasznos mező
	content JSON NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	published_at TIMESTAMP NULL DEFAULT NULL,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (author_id) REFERENCES Users(id) ON DELETE SET NULL
) ENGINE = InnoDB;

-- Indexek létrehozása a gyakran használt oszlopokra (opcionális, de ajánlott a teljesítmény érdekében)
-- CREATE INDEX idx_blogs_author ON Blogs(author_id);
-- CREATE INDEX idx_blog_blocks_parent ON BlogBlocks(blog_id);

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
