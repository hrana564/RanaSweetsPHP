<?php

require_once '../Utils/DBConfig.php';
			
parse_str($_SERVER['QUERY_STRING']);

// Query the database to show all the tables.
$query = "Select Products.ID,Products.Name,Products.Description,Products.Price,Categories.Name as CategoryName,Products.InStock,Products.PhotoURL,Products.IsActive,Products.CreatedOn,Products.LastUpdatedOn FROM products as Products inner join categories as Categories on Products.CategoryID=Categories.ID where Products.IsActive=true and Categories.IsActive=True order by Name";
$data = array();
$result = mysqli_query($conn, $query);
// Print the results of the query.
while($row = mysqli_fetch_array($result)) {
	$data[] = $row;
}
echo json_encode($data);

?>