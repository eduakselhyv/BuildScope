<?php
// CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE"); 
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/x-www-form-urlencoded');

// Include functions
require 'vendor/autoload.php';
require 'endpoints/userFunctions.php';
require 'endpoints/taskFunctions.php';

// Connect to MongoDB
$client = new MongoDB\Client("mongodb+srv://akselihyvonen:7dvc2uBvP9YL0jae@mediareview.sorsm.mongodb.net/?retryWrites=true&w=majority&appName=MediaReview");
$db = $client->selectDataBase('mediareview');

// Get data from request
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/'));

switch ($request[0]) {
    case 'users':
        switch ($request[1]) {
            case 'login':
                echo login($_POST['username'], $_POST['password'], $db);
                break;
            case 'register':
                echo register($_POST['username'], $_POST['password'], $db);
                break;
        }
        break;

    case 'tasks':
        switch ($request[1]) {
            case 'get-tasks':
                break;
            case 'create-task':
                echo createTask($_POST['name'], $_POST['desc'], $_POST['img'], $db);
                break;
            case 'delete-task':
                break;
            case 'update-task':
                break;
        }
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found']);
        break;
}