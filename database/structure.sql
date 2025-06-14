-- Table catégories
CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nom VARCHAR(255) NOT NULL
);

-- Table connaissances
CREATE TABLE connaissances (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nom VARCHAR(255) NOT NULL,
  description TEXT,
  niveau VARCHAR(50),
  date DATE,
  categorie_id INT,
  FOREIGN KEY (categorie_id) REFERENCES categories(id)
);