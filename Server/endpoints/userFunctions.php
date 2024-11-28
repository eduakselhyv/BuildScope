<?php

function login($username, $password, $service) {
    $db = $service->initializeDatabase('users', 'id');

    try {
        $user = $db->findBy('username', $username)->getResult();

        if ($user && password_verify($password, $user[0]->password)) {
            http_response_code(200); 
            return json_encode(['message' => 'Login successful']);
        } else {
            http_response_code(401);
            return json_encode(['error' => 'Invalid username or password']);
        }
    } catch (Error $e) {
        http_response_code(500);
        return $e->getMessage();
    }
}

function register($username, $password, $service) {
    $db = $service->initializeDatabase('users', 'id');

    try {
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
            http_response_code(201);
            return json_encode(['message' => 'Successfully created user']);
        }
    } catch (Error $e) {
        http_response_code(500);
        return $e->getMessage();
    }
}

function users($service) {
    $db = $service->initializeDatabase('users', 'id');

    try {
        $users = $db->fetchAll()->getResult();

        http_response_code(200); 
        return json_encode(['users' => $users]);
    } catch (Error $e) {
        http_response_code(500);
        return $e->getMessage();
    }
}

function deleteUser($id, $service) {
    $db = $service->initializeDatabase('users', 'id');
    
    try {
        $db->delete($id);

        http_response_code(200); 
        return json_encode(['message' => 'User deleted!']);
    } catch (Error $e) {
        http_response_code(500);
        return $e->getMessage();
    }
}