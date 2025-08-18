<?php
include 'db.php';

$result = $conn->query("SELECT * FROM notices ORDER BY created_at DESC");
$notices = [];
while ($row = $result->fetch_assoc()) $notices[] = $row;

header('Content-Type: application/json');
echo json_encode($notices);
?>
