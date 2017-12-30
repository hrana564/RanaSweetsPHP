<?php

require_once '../Utils/DBConfig.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
$OD  = $_POST['OD'];
$OC = $_POST['OC'];

$OCObj = json_decode($OD);
$OCArray = json_decode($OC);
try {
	/* set autocommit to off */
	$conn->autocommit(FALSE);
	$sql = "INSERT INTO `orders`(`Name`, `Mobile`, `Email`, `DateOfDelivery`, `Address`, `TotalCost`, `DiscountPercentage`, `FinalCost`, `IsDelivered`, `Comments`, `IsActive`, `CreatedOn`, `LastUpdatedOn`) value('$OCObj->Name','$OCObj->Mobile','$OCObj->Email','$OCObj->DateOfDelivery','$OCObj->Address',$OCObj->TotalCost,$OCObj->DiscountPercentage,$OCObj->FinalCost,0,'',1,NOW(),NOW())";
	$result = $conn->query($sql);
	if(! ($result === True)){
		 throw new Exception("Cannot Place Order!!!");
	}
	$sql = "SELECT MAX(`ID`) as MAXID FROM `orders`";
	$result = $conn->query($sql);
    while($row = $result->fetch_assoc()) {
        $NewOrderID = $row["MAXID"];
    }

	foreach ($OCArray as $value) {
		$sql = "INSERT INTO `orderproducts`(`OrderID`, `Name`, `PricePerKG`, `TotalCost`, `Quantity`, `CreatedOn`, `LastUpdatedOn`) select $NewOrderID,'$value->Name',(SELECT `Price` FROM `products` where `Name`='$value->Name'),(SELECT `Price` * $value->Quantity FROM `products` where `Name`='$value->Name'),'$value->Quantity',NOW(),NOW()";
		$result = $conn->query($sql);
		if(! ($result === True)){
			throw new Exception("Cannot Place Sub Order!!!");
		}
	}
	$conn->commit();
	echo "[{\"Result\":\"True\"}]";
	
} catch (Exception $e) {
	$conn->rollback();
	echo "[{\"Result\":\"False\"}]";
}
/* set autocommit to off */
$conn->autocommit(True);
$conn->close();

?>