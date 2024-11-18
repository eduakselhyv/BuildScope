<?php
use \Firebase\JWT\JWT;

function login($username, $password, $db, $jwtSecret) {
    // Find user in database
    $user = $db->users->findOne(['username' => $username]);

    // If password is correct and user exists
    if ($user && password_verify($password, $user->password)) {
        // Create the JWT payload
        $payload = [
            'iat' => time(),
            'exp' => time() + (60 * 60), 
            'sub' => (string)$user->_id,
        ];

        // Encode the JWT
        $jwt = JWT::encode($payload, $jwtSecret, 'HS256'); 

        // Set the cookie
        setcookie(
            'jwt',          // Name
            $jwt,           // Value
            time() + 3600,  // Cookie expiration
            "/",            // Path
            "localhost",    // Domain
            false,          // Set to true for HTTPS
            true,           // HttpOnly flag (cannot be accessed by JavaScript)
            ['samesite' => 'None'] // Set SameSite to None for cross-origin requests
        );

        http_response_code(200); 

    } else {
        http_response_code(401);
        return json_encode(['error' => 'Invalid username or password']);
    }
}

function register($username, $password, $db) {
    // Find if user exists with name
    $exists = $db->users->findOne(['username' => $username]);

    if ($exists) { // If exists, return 401
        http_response_code(401);
    } else { // If doesn't, create user
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        $db->users->insertOne(['username' => $username, 'password' => $hashedPassword]);
        http_response_code(201); 
        return true;
    }
}

function auth($jwt, $jwtSecret) {
    if (!isset($jwt)) { // Check if jwt is given
        http_response_code(401);
        echo json_encode(['error' => 'No JWT token found in cookie']);
        return;
    }

    try {
        $decoded = JWT::decode($jwt, $jwtSecret, ['HS256']); // Attempt to decode JWT

        echo json_encode(['message' => 'Authenticated', 'user' => $decoded]);
    } catch (Exception $e) { // If fails, throw 401
        http_response_code(401);
        echo json_encode(['error' => 'Invalid or expired token', 'message' => $e->getMessage()]);
    }
}