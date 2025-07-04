# Mes Connaissances

## Description

Mes Connaissances est une application web permettant de recenser et gérer tes connaissances personnelles par catégories.  
Le projet est divisé en deux parties :  
- **Backend** : PHP avec MariaDB pour la gestion des données.  
- **Frontend** : Application React en TypeScript, construite avec Vite.


## Installation

### 1. Base de données

- Crée la base de données :

```bash
mysql -u root -p
CREATE DATABASE mes_connaissances;
EXIT;
```

### 2. Backend
- Dans backend/src crée un fichier `config.php` (non versionné, voir `.gitignore`) :

```php
<?php
return [
    'DB_HOST' => 'localhost',
    'DB_NAME' => 'mes_connaissances',
    'DB_USER' => 'root',
    'DB_PASS' => 'ton_mot_de_passe',
    'DB_CHARSET' => 'utf8mb4',
];
```

- Installe les dépendances PHP si besoin :
```sh
composer install
```

- Crée la base de données et les tables dans MariaDB/MySQL :

```sql
CREATE DATABASE mes_connaissances CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE mes_connaissances;

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL
);

CREATE TABLE connaissances (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    description TEXT,
    niveau VARCHAR(50),
    date DATE,
    categorie_id INT,
    FOREIGN KEY (categorie_id) REFERENCES categories(id) ON DELETE SET NULL
);
```

- (Optionnel) Ajout des catégories de base :
- (Optionnel) Ajout de mes connaissances personnelles :
```sql
INSERT INTO categories (nom) VALUES
('frontend'), ('backend'), ('outils'), ('base de données'), ('design');

INSERT INTO connaissances (nom, niveau, date, categorie_id) VALUES
('HTML', 'avancé', '2024-07-01', 1),
('CSS', 'avancé', '2024-07-01', 1),
('JavaScript', 'avancé', '2024-07-01', 1),
('React', 'avancé', '2024-07-01', 1),
('Vue JS', 'intermédiaire', '2024-12-31', 1),

('Node.js', 'avancé', '2024-07-01', 2),
('PHP', 'intermédiaire', '2024-12-31', 2),
('MySQL', 'intermédiaire', '2024-07-01', 2),

('Git', 'avancé', '2022-07-01', 3),
('MongoDB', 'intermédiaire', '2024-07-01', 3),
('MariaDB', 'débutant', '2025-05-16', 3),
('Suite Microsoft', 'intermédiaire', '2021-07-01', 3),
('Notion', 'avancé', '2024-07-01', 3),
('Vite', 'avancé', '2024-07-01', 3),

('C', 'intermédiaire', '2022-07-01', 4),
('C++', 'débutant', '2023-07-01', 4),
('OCaml', 'intermédiaire', '2024-07-01', 4),
('Shell/Bash', 'intermédiaire', '2022-07-01', 4),

('Figma', 'intermédiaire', '2023-07-01', 5),
('Canva', 'avancé', '2021-07-01', 5);
```

### 3. Frontend
Dans frontend/ :
```sh
npm run dev
```



### Configuration
- Le backend PHP doit être accessible à l’URL définie dans `api.ts` (`API_URL = "http://localhost:8000"`)
- Le fichier `config.php` **ne doit jamais être versionné** (il contient tes identifiants de base de données)

