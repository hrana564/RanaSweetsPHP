<?php

$servername = 'localhost';
$username = 'himanshu';
$password = 'admin123';
$database = 'ranasweets';

// Create connection
$conn = new mysqli($servername, $username, $password,$database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

?>