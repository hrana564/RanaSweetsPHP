<?php

require_once '../Utils/DBConfig.php';
parse_str($_SERVER['QUERY_STRING']);

$sql = "Select Products.ID,Products.Name,Products.Description,Products.Price,Categories.Name as CategoryName,Products.InStock,Products.PhotoURL,Products.IsActive,Products.CreatedOn,Products.LastUpdatedOn FROM Products inner join Categories on Products.CategoryID=Categories.ID where Products.IsActive=true and Categories.IsActive=True";

$data = array();

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
} else {
    echo "[]";
}
echo json_encode($data);
$conn->close();

?>