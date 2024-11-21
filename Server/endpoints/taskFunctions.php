<?php

function getTasks($view, $user, $db) {
    try {
        if ($view === "your-tasks") {
            $results = $db->tasks->find([
                'assigned_to' => $user
            ]);
        } else {
            $results = $db->tasks->find([
                'status' => "Unassigned"
            ]);
        }

        $tasks = iterator_to_array($results);

        http_response_code(200);
        return json_encode(['message' => $tasks]);

    } catch (Exception $e) {
        error_log($e->getMessage());
        http_response_code(401);
        return json_encode(['message' => 'An error occurred.']);
    }
}

function createTask($name, $desc, $img, $installer, $db) {
    try {
        $db->tasks->insertOne([
            'name' => $name,
            'desc' => $desc,
            'img' => $img,
            'status' => "Unassigned",
            'assigned_to' => [],
            'created_at' => new MongoDB\BSON\UTCDateTime(),
            'comments' => [],
            'installer' => $installer,
        ]);

        http_response_code(201);
        echo json_encode(["message" => "Task created successfully."]);

    } catch (Error $e) {
        error_log($e);
        http_response_code(500);
        echo json_encode(["error" => "An unexpected error occurred."]);
    }
}