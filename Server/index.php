<?php
// Allow all origins to access the server
header("Access-Control-Allow-Origin: *"); // Allow all domains
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE"); // Allow specific HTTP methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow these headers

header('Content-Type: application/x-www-form-urlencoded');
$jwtSecret = "defojear0uer980rhj320rhnf0eiwhtn4308it43j";

// Include functions
require 'vendor/autoload.php';
require 'endpoints/userFunctions.php';

// Connect to MongoDB
try {
    $client = new MongoDB\Client("mongodb+srv://akselihyvonen:7dvc2uBvP9YL0jae@mediareview.sorsm.mongodb.net/?retryWrites=true&w=majority&appName=MediaReview");
    $db = $client->selectDataBase('mediareview');
} catch (Exception $e) {
    echo $e;
}

// Get data from request
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/'));
error_log('Request Body: ' . $_POST);

switch ($request[0]) {
    case 'users':
        switch ($request[1]) {
            case 'login':
                echo login($_POST['username'], $_POST['password'], $db, $jwtSecret);
                break;
            case 'register':
                echo register($_POST['username'], $_POST['password'], $db);
                break;
            case 'auth':
                echo $data;
                break;
        }
        break;

    case 'tasks':
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found']);
        break;
}