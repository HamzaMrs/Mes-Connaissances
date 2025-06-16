<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../src/db.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if (isset($_GET['categorie_id']) && $_GET['categorie_id'] !== '') {
            $stmt = $pdo->prepare("SELECT * FROM connaissances WHERE categorie_id = ?");
            $stmt->execute([$_GET['categorie_id']]);
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        } else {
            $stmt = $pdo->query("SELECT * FROM connaissances");
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['nom'], $data['description'], $data['niveau'], $data['date'], $data['categorie_id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Champs manquants']);
            exit;
        }
        $stmt = $pdo->prepare("INSERT INTO connaissances (nom, description, niveau, date, categorie_id) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['nom'],
            $data['description'],
            $data['niveau'],
            $data['date'],
            $data['categorie_id']
        ]);
        echo json_encode(['id' => $pdo->lastInsertId()]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['id'], $data['nom'], $data['description'], $data['niveau'], $data['date'], $data['categorie_id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Champs manquants pour la mise à jour']);
            exit;
        }
        $stmt = $pdo->prepare("UPDATE connaissances SET nom=?, description=?, niveau=?, date=?, categorie_id=? WHERE id=?");
        $stmt->execute([
            $data['nom'],
            $data['description'],
            $data['niveau'],
            $data['date'],
            $data['categorie_id'],
            $data['id']
        ]);
        echo json_encode(['success' => true]);
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'ID manquant pour la suppression']);
            exit;
        }
        $stmt = $pdo->prepare("DELETE FROM connaissances WHERE id=?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Méthode non autorisée']);
        break;
}
?>