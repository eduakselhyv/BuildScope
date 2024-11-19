<?php
use \Firebase\JWT\JWT;

function login($username, $password, $db, $jwtSecret) {
    // Find user in database
    $user = $db->users->findOne(['username' => $username]);

    // If password is correct and user exists
    if ($user && password_verify($password, $user->password)) {
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