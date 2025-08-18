<?php
include 'db.php';

if (!isset($_POST['text']) || !isset($_POST['user_id'])) {
    http_response_code(400);
    echo "Missing data"; 
    exit;
}

$text = $conn->real_escape_string($_POST['text']);
$user_id = $conn->real_escape_string($_POST['user_id']);

$sql = "INSERT INTO notices (user_id, text) VALUES ('$user_id', '$text')";
if ($conn->query($sql)) {
    echo "success";
} else {
    http_response_code(500);
    echo "Error: ".$conn->error;
}
?>
