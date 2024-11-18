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

        // Cookie parameters
        $cookieName = "JWT"; 
        $cookieValue = $jwt;
        $cookieExpiration = time() + (60 * 60);
        $cookiePath = "/";
        $cookieHttpOnly = true;

        // Set the cookie
        setcookie($cookieName, $cookieValue, $cookieExpiration, $cookiePath, '', $cookieHttpOnly);

        http_response_code(200); 

    } else {
        http_response_code(401);
        return json_encode(['error' => 'Invalid username or password']);
    }
}

function register($username, $password, $db) {
    // Find if user exists with name
    $exists = $db->users->findOne(['username' => $username]);

    if ($exists) {
        http_response_code(401);
    } else {
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        $db->users->insertOne(['username' => $username, 'password' => $hashedPassword]);
        http_response_code(201); 
        return true;
    }
}