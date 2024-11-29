<?php

function getTasks($view, $user, $service, $mdb) {
    $db = $service->initializeDatabase('tasks', 'id');

    try {
        if ($view === "your-tasks") {
            $result = $db->findBy('assigned_to', $user)->getResult();
        } else {
            $result = $db->findBy('status', "Unassigned")->getResult();
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

function createComment($taskId, $user, $comment, $date, $service) {
    $db = $service->initializeDatabase('tasks', 'id');

    try {
        $result = $db->findBy('id', $taskId)->getResult();
        $task = (array) $result[0]; //  need to convert into an array from an object so it works

        $existingComments = $task['comments'];

        $newComment = [
            'user' => $user,
            'comment' => $comment,
            'date' => $date
        ];

        $updatedComments = [...$existingComments, $newComment];

        $updateResult = $db->update($taskId, ['comments' => $updatedComments]);
        if ($updateResult) {
            http_response_code(200);
            return json_encode(["message" => "Comment added successfully."]);
        } else {
            http_response_code(500);
            return json_encode(["message" => "Failed to add comment."]);
        }
    } catch (Error $e) {
        http_response_code(500);
        return $e->getMessage();
    }
}

function deleteComment($taskId, $commentIndex, $service) {
    $commentIndex = intval($commentIndex);
    $db = $service->initializeDatabase('tasks', 'id');

    try {
        $result = $db->findBy('id', $taskId)->getResult();
        $task = (array) $result[0];
        $comments = $task['comments'];

        if (isset($comments[$commentIndex])) {
            array_splice($comments, $commentIndex, 1);
            $updateResult = $db->update($taskId, ['comments' => $comments]);
            if ($updateResult) {
                http_response_code(200);
                return json_encode(["message" => "Comment deleted successfully."]);
            } else {
                http_response_code(500);
                return json_encode(["message" => "Failed to delete comment."]);
            }
        }
    } catch (Error $e) {
        http_response_code(500);
        return $e->getMessage();
    }
}