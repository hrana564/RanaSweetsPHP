<?php

require_once '../Utils/DBConfig.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
$ID = $_POST['ID'];
$Name  = $_POST['Name'];
$Price = $_POST['Price'];
$Description  = $_POST['Description'];
$Category = $_POST['Category'];
$InStock  = $_POST['InStock'];
$IsActive  = $_POST['IsActive'];

if($ID ==""){
	$sql = "INSERT INTO `products`(`Name`, `Description`, `Price`, `CategoryID`, `InStock`, `PhotoURL`, `IsActive`, `CreatedOn`, `LastUpdatedOn`) Select '$Name','$Description',$Price,(Select ID from Categories where name ='$Category'),$InStock,'',$IsActive,NOW(),NOW()";
} else{
	$sql = "Update `products` set `Name`='$Name', `Description`='$Description', `Price`=$Price, `CategoryID`=(Select ID from Categories where name ='$Category'), `InStock`=$InStock, `IsActive`=$IsActive, `LastUpdatedOn`=NOW() where `ID`=$ID";
}

$result = $conn->query($sql);
if ($result===True) {
    echo "[{\"Result\":\"True\"}]";
} else {
    echo "[{\"Result\":\"False\"}]";
}
$conn->close();

?>