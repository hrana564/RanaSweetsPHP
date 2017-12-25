<?php

require_once '../Utils/DBConfig.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
$ID = $_POST['ID'];

$sql = "Delete from `products` where `ID`=$ID";

$result = $conn->query($sql);
if ($result===True) {
    echo "[{\"Result\":\"True\"}]";
} else {
    echo "[{\"Result\":\"False\"}]";
}
$conn->close();

?>