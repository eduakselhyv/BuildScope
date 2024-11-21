<?php

function createTask($name, $desc, $img, $db) {
    try {
        $db->tasks->insertOne([
            'name' => $name,
            'desc' => $desc,
            'img' => $img,
            'status' => "Unassigned",
            'assigned_to' => [],
            'created_at' => new MongoDB\BSON\UTCDateTime(),
        ]);
        http_response_code(201);
    } catch (Error $e) {
        error_log($e);
        http_response_code(401);
    }
}