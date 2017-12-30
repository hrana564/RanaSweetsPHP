<?php

require_once '../Utils/DBConfig.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
$ID = $_POST['ID'];
$Name  = $_POST['Name'];
$TotalCost = $_POST['TotalCost'];
$Quantity  = $_POST['Quantity'];
$PricePerKG  = $_POST['PricePerKG'];

$sql = "Update `orderproducts` set `Name`='$Name', `TotalCost`=$TotalCost, `Quantity`=$Quantity, `PricePerKG`=$PricePerKG, `LastUpdatedOn`=NOW() where `ID`=$ID";

$result = $conn->query($sql);
if ($result===True) {
    echo "[{\"Result\":\"True\"}]";
} else {
    echo "[{\"Result\":\"False\"}]";
}
$conn->close();

?>