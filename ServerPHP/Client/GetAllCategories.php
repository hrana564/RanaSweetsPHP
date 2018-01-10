<?php
require_once '../Utils/DBConfig.php';			
parse_str($_SERVER['QUERY_STRING']);

// Query the database to show all the tables.
$query = "Select * from categories as Categories where IsActive=True";
$data = array();
$result = mysqli_query($conn, $query);
// Print the results of the query.
while($row = mysqli_fetch_array($result)) {
	$data[] = $row;
}
echo json_encode($data);

?>