<?php

function login($username, $password, $db) {
    // Find user in database
    $user = $db->users->findOne(['username' => $username]);

    if ($user && password_verify($password, $user->password)) {
        session_start();
        $_SESSION['user_id'] = (string)$user->_id;
        $_SESSION['username'] = $username;

        http_response_code(200); 
        return json_encode(['message' => 'Login successful']);
    } else {
        http_response_code(401);
        return json_encode(['error' => 'Invalid username or password']);
    }
}

function register($username, $password, $db) {
    $exists = $db->users->findOne(['username' => $username]);

    if ($exists) { // If exists, return 401
        http_response_code(401);
        return json_encode(['error' => 'User already exists']);
    } else {
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        $db->users->insertOne(['username' => $username, 'password' => $hashedPassword]);
        http_response_code(201); 
        return json_encode(['message' => 'User registered successfully']);
    }
}