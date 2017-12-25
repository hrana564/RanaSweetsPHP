<?php

require_once '../Utils/DBConfig.php';
parse_str($_SERVER['QUERY_STRING']);
$sql = "Call A_GetAllCategories ($PageIndex,$PageSize)";
$data = array();

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
} else {
    echo "0 results";
}
echo json_encode($data);
$conn->close();

?>