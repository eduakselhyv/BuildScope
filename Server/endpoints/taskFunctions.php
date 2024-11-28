<?php

function getTasks($view, $user, $service, $mdb) {
    $db = $service->initializeDatabase('tasks', 'id');

    try {
        if ($view === "your-tasks") {
            $result = $db->findBy('assigned_to', $user)->getResult();
        } else {
            $result = $db->findBy('assigned_to', "")->getResult();
        }

        $tasks = iterator_to_array($result);

        http_response_code(200);
        return json_encode(['message' => $tasks]);

    }  catch (Error $e) {
        http_response_code(500);
        return $e->getMessage();
    }
}

function createTask($name, $desc, $img, $installer, $service, $mdb) {
    $db = $service->initializeDatabase('tasks', 'id');

    try {
        $newtask = [
            'name' => $name,
            'desc' => $desc,
            'img' => $img,
            'status' => "Unassigned",
            'assigned_to' => "",
            'created_at' => date("Y-m-d H:i:s"),
            'comments' => [],
            'installer' => $installer
        ];

        $db->insert($newtask);

        http_response_code(201);
        echo json_encode(["message" => "Task created successfully."]);

    }  catch (Error $e) {
        http_response_code(500);
        return $e->getMessage();
    }
}

function updateStatus($id, $status, $service) {
    $db = $service->initializeDatabase('tasks', 'id');

    try {
        $updatedtask = [
            'status' => $status
        ];

        $data = $db->update($id, $updatedtask);
        echo json_encode(["message" => $data[0]]);
    } catch (Error $e) {
        http_response_code(500);
        return $e->getMessage();
    }
}