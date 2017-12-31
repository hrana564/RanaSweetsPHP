<?php

function generateRandomString($length = 100) {
	$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	$charactersLength = strlen($characters);
	$randomString = '';
	for ($i = 0; $i < $length; $i++) {
		$randomString .= $characters[rand(0, $charactersLength - 1)];
	}
	return $randomString;
}

function AuthenticateUser($UserName, $Password,$conn){
	$sql = "select * from mstusers where UserName='$UserName' and UserPassword='$Password' and IsActive=True";
	$result = $conn->query($sql);
	if ($result->num_rows > 0) {
    // output data of each row
		while($row = $result->fetch_assoc()) {
			$NewAuthToken = generateRandomString();
			$sql = "update mstusers set AuthToken='$NewAuthToken' where UserName='$UserName'";
			$result = $conn->query($sql);
			if ($result===True) {
			    return $NewAuthToken;
			} else {
			    return "-2";
			}
		}
	} else {
		return "-1";
	}
}

function ValidateToken($Token,$conn) {
	if(strlen($Token)==100){
		$sql = "select * from mstusers where AuthToken='$Token'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0) {
			return "1";
		} else {
			return "-2";
		}
	} else {
		return "-1";
	}
}

?>