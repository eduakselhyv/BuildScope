<?php
require_once 'vendor/autoload.php'; // Make sure to install firebase/php-jwt via Composer
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

// JWT Configuration
$JWT_SECRET = 'your_very_secret_key_here_change_in_production'; // just an example secret key for development so that we don't have to generate a new .env file  every time
$JWT_EXPIRATION = time() + (60 * 60); // Token expires in 1 hour

function generateJWT($username) {
    global $JWT_SECRET, $JWT_EXPIRATION;

    $payload = [
        'iss' => 'localhost', // Issuer
        'aud' => 'localhost', // Audience
        'iat' => time(), // Issued at
        'exp' => $JWT_EXPIRATION, // Expiration time
        'username' => $username
    ];

    return JWT::encode($payload, $JWT_SECRET, 'HS256');
}

function validateJWT($token) {
    global $JWT_SECRET;

    try {
        $decoded = JWT::decode($token, new Key($JWT_SECRET, 'HS256'));
        return $decoded;
    } catch (Exception $e) {
        return false;
    }
}

function login($username, $password, $service) {
    $db = $service->initializeDatabase('users', 'id');

    try {
        $user = $db->findBy('username', $username)->getResult();

        if ($user && password_verify($password, $user[0]->password)) {
            // Generate JWT
            $token = generateJWT($username);

            http_response_code(200); 
            return json_encode([
                'message' => 'Login successful', 
                'token' => $token,
                'username' => $username
            ]);

        } else {
            http_response_code(401);
            return json_encode(['error' => 'Invalid username or password']);
        }
    }  catch (Error $e) {
        http_response_code(500);
        return $e->getMessage();
    }
}

function register($username, $password, $service) {
    $db = $service->initializeDatabase('users', 'id');

    try{
        $exists = $db->findBy('username', $username)->getResult();

        if ($exists) {
            http_response_code(401);
            return json_encode(['error' => 'User already exists']);

        } else {
            $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

            $newuser = [
                'username' => $username,
                'password' => $hashedPassword
            ];

            $db->insert($newuser);
            
            // Generate JWT for the new user
            $token = generateJWT($username);

            http_response_code(201);
            return json_encode([
                'message' => 'Successfully created user', 
                'token' => $token,
                'username' => $username
            ]);
        }
    } catch (Error $e) {
        http_response_code(500);
        return $e->getMessage();
    }
}

function users($service, $token) {
    // Validate JWT before allowing access to users list
    $decoded = validateJWT($token);
    
    if (!$decoded) {
        http_response_code(401);
        return json_encode(['error' => 'Invalid or expired token']);
    }

    $db = $service->initializeDatabase('users', 'id');

    try{
        $users = $db->fetchAll()->getResult();

        http_response_code(200); 
        return json_encode(['users' => $users]);
    } catch (Error $e) {
        http_response_code(500);
        return $e->getMessage();
    }
}

// Middleware to check JWT for protected routes
function checkJWTMiddleware($token) {
    $decoded = validateJWT($token);
    
    if (!$decoded) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized: Invalid token']);
        exit;
    }
    
    return $decoded;
}