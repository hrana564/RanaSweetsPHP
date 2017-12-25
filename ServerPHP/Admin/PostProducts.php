<?php

require_once '../Utils/DBConfig.php';
$ID = $_REQUEST['ID'];
$Name  = $_REQUEST['Name'];
$Price = $_REQUEST['Price'];
$Description  = $_REQUEST['Description'];
$Category = $_REQUEST['Category'];
$InStock  = $_REQUEST['InStock'];
$IsActive  = $_REQUEST['IsActive'];

if($ID ==""){
	$sql = "INSERT INTO `products`(`Name`, `Description`, `Price`, `CategoryID`, `InStock`, `PhotoURL`, `IsActive`, `CreatedOn`, `LastUpdatedOn`) values ('$Name','$Description',$Price,$Category,$InStock,'',$IsActive,NOW(),NOW())";
} else{
	$sql = "Update `products` set `Name`='$Name', `Description`='$Description', `Price`=$Price, `CategoryID`=$Category, `InStock`=$InStock, `IsActive`=$IsActive, `LastUpdatedOn`=NOW() where `ID`=$ID";
}
echo $sql;

$result = $conn->query($sql);

if ($result===True) {
    echo "[{'Result':'True'}]";
} else {
    echo "[{'Result':'False'}]";
}
$conn->close();

?>