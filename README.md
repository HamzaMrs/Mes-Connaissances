# Mes Connaissances

## Installation

### Backend
- Crée la base de données avec le script `database/structure.sql`
- Configure `backend/src/db.php` avec tes identifiants MySQL
- Place le dossier `backend/public` sur ton serveur local (ex: XAMPP, WAMP)

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Structure
- `/frontend` : React + Tailwind
- `/backend` : API PHP
- `/database` : scripts SQL

## API
- `/connaissances.php` : CRUD connaissances
- `/categories.php` : CRUD catégories