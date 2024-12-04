<?php
// CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/x-www-form-urlencoded');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Include functions
require 'vendor/autoload.php';
require 'endpoints/userFunctions.php';
require 'endpoints/taskFunctions.php';

// Connect to MongoDB
$mdbclient = new MongoDB\Client("mongodb+srv://akselihyvonen:7dvc2uBvP9YL0jae@mediareview.sorsm.mongodb.net/?retryWrites=true&w=majority&appName=MediaReview");
$mdb = $mdbclient->selectDataBase('mediareview');

// Connect to supabase
$sbservice = new PHPSupabase\Service(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpa3V4eG1pcWRsa3B0am9nbWttIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjUzNTU5MywiZXhwIjoyMDQ4MTExNTkzfQ.gAiOOrJlr3tNJuZJIbMn0vzSROLFyphBOXP_JAL-ClE",
    "https://vikuxxmiqdlkptjogmkm.supabase.co"
);

// Get data from request
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/'));

// Assuming you have a function to get request data
function getRequestData() {
    return json_decode(file_get_contents('php://input'), true);
}

$requestData = getRequestData();

switch ($request[0]) {
    case 'users':
        switch ($request[1]) {
            case 'login':
                if (!isset($requestData['username']) || !isset($requestData['password'])) {
                    http_response_code(400);
                    echo json_encode(['error' => 'Username and password are required']);
                    exit;
                }
                echo login($requestData['username'], $requestData['password'], $sbservice);
                break;
            case 'register':
                if (!isset($requestData['username']) || !isset($requestData['password'])) {
                    http_response_code(400);
                    echo json_encode(['error' => 'Username and password are required']);
                    exit;
                }
                echo register($requestData['username'], $requestData['password'], $sbservice);
                break;
            case 'users':
                $token = getBearerToken();
                echo users($sbservice, $token);
                break;
        }
        break;

    case 'tasks':
        switch ($request[1]) {
            case 'get-tasks':
                echo getTasks($_GET['view'], $_GET['user'], $sbservice, $mdb);
                break;
            case 'create-task':
                if (!isset($_POST['name']) || !isset($_POST['desc']) || !isset($_FILES['img']) || !isset($_POST['installer'])) {
                    http_response_code(400);
                    echo json_encode(['error' => 'All fields are required']);
                    exit;
                }
                echo createTask($_POST['name'], $_POST['desc'], $_FILES['img'], $_POST['installer'], $sbservice, $mdb);
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

// Function to get Bearer token from Authorization header
function getBearerToken() {
    $headers = apache_request_headers();
    if (isset($headers['Authorization'])) {
        $matches = [];
        if (preg_match('/Bearer\s(\S+)/', $headers['Authorization'], $matches)) {
            return $matches[1];
        }
    }
    return null;
}