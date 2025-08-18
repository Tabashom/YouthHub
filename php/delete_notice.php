<?php
include 'db.php';

if (!isset($_POST['id']) || !isset($_POST['user_id'])) exit;

$id = intval($_POST['id']);
$user_id = $conn->real_escape_string($_POST['user_id']);

$conn->query("DELETE FROM notices WHERE id=$id AND user_id='$user_id'");
?>
