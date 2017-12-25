<?php

require_once '../Utils/DBConfig.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
$ID = $_POST['ID'];
$Name  = $_POST['Name'];
$IsActive  = $_POST['IsActive'];

if($ID ==""){
	$sql = "INSERT INTO `Categories`(`Name`, `IsActive`, `CreatedOn`, `LastUpdatedOn`) Select '$Name',$IsActive,NOW(),NOW()";
} else{
	$sql = "Update `Categories` set `Name`='$Name', `IsActive`=$IsActive, `LastUpdatedOn`=NOW() where `ID`=$ID";
}

$result = $conn->query($sql);
if ($result===True) {
    echo "[{\"Result\":\"True\"}]";
} else {
    echo "[{\"Result\":\"False\"}]";
}
$conn->close();

?>