var app = angular.module("GheeAdminApp", []); 

app.controller('mainController', ['$http','$scope','UtilityObject', function($http,$scope,Utility){

	$scope.username = "";
	$scope.password = "";
	$scope.accessToken = "";
	$scope.invalidUsername = false;
	$scope.invalidPassword = false;
	$scope.invalidUP = false;

$scope.ValidateAndLogin = function () {
	$scope.invalidUsername = false;
	$scope.invalidPassword = false;
	$scope.invalidUP = false;
	if($scope.username==""){
		$scope.invalidUsername = true;
		if($scope.password==""){
			$scope.invalidPassword = true;
		}
		$scope.username = "";
		$scope.password = "";
		return;
	}	
	if($scope.password==""){
		$scope.invalidPassword = true;
		$scope.password = "";
		return;
	}
      $http({
                url: window.location.origin+'/ServerPHP/Admin/Login.php',
                method: "POST",
                data: { 'userName':$scope.username, 'password':$scope.password}
            })
      .then(function(response) {
                // success
                if(response.data[0].AuthToken.length==100){
                	localStorage.setItem('RanaSweetsAT', response.data[0].AuthToken);
                	window.location = window.location.origin+'/Admin/orders.html?Mode=2';
                } else {
                	console.log(response);
	                $scope.invalidUP = true;
	                $scope.username = "";
	                $scope.password = "";
                }
            }).catch(function(response) { 
                // failure
                console.log(response);
                $scope.invalidUP = true;
                $scope.username = "";
                $scope.password = "";
            });
    };
}]);
app.service("UtilityObject", Utility);