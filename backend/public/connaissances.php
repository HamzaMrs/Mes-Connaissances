<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../src/db.php';
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $stmt = $pdo->query("SELECT * FROM connaissances");
        echo json_encode($stmt->fetchAll());
        break;
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
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
        parse_str(file_get_contents("php://input"), $data);
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
        parse_str(file_get_contents("php://input"), $data);
        $stmt = $pdo->prepare("DELETE FROM connaissances WHERE id=?");
        $stmt->execute([$data['id']]);
        echo json_encode(['success' => true]);
        break;
}
?>