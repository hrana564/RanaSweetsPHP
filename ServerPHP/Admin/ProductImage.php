<!DOCTYPE html>
<html>
<body>
	<?php

	require_once '../Utils/DBConfig.php';
	require_once '../Utils/PHPFunctions.php';
	parse_str($_SERVER['QUERY_STRING']);

	$target_dir = $_SERVER['DOCUMENT_ROOT']."/images/Products/";
	if(isset($_FILES['image'])){
		$errors= array();
		$file_name = $_FILES['image']['name'];
		$file_size =$_FILES['image']['size'];
		$file_tmp =$_FILES['image']['tmp_name'];
		$file_type=$_FILES['image']['type'];
		$tmp = explode('.', $file_name);
		$file_ext=strtolower(end($tmp));
		$NewFileName =generateRandomString(26) . ".".$file_ext;

		$expensions= array("jpeg","jpg","png");

		if(in_array($file_ext,$expensions)=== false){
			$errors[]="extension not allowed, please choose a JPEG or PNG file.";
		}

		if($file_size > 1097152){
			$errors[]='File size must be less than 1 MB';
		}

		if(empty($errors)==true){
			move_uploaded_file($file_tmp,$target_dir.$NewFileName);
		}else{
			$errors[]='Internal error occured while moving image';
		}
		$sql = "update `products` set `PhotoURL`='$NewFileName' where `ID`=$OrderID";
		$result = $conn->query($sql);
		if ($result===True) {
			echo "Success";
		} else {
			$errors[] = 'Error occured while registering image to database';
		    print_r($errors);
		}
	}

	$sql = "Select `PhotoURL` FROM `products` where `ID`=$OrderID";
	$result = $conn->query($sql);
	while($row = $result->fetch_assoc()) {
		$PhotoURL = $row["PhotoURL"];
	}

	if($PhotoURL == "" || $PhotoURL == NULL){
		$PhotoURL = "default.png";
	}
	echo "<div style=\"width: 250px; height: 150px;\"><img src=\"/images/Products/$PhotoURL\" style=\"width: 100%; height: 100%\"></div>" ;
	$conn->close();

	?>

	   <form action="#" method="POST" enctype="multipart/form-data">
         <input type="file" name="image" />
         <input type="submit"/>
      </form>

</body>
</html>