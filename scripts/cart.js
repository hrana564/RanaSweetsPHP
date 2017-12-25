Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() + parseInt(days));
    return this;
};

var app = angular.module("RanaSweetsApp", []); 

app.controller('cartController', ['$http','$scope', function($http,$scope){

	$scope.CartProducts = typeof localStorage.getItem('RanaSweetsCart') == "string" &&  localStorage.getItem('RanaSweetsCart') != "undefined" ? JSON.parse(localStorage.getItem('RanaSweetsCart')) : [];
	$scope.FinalCartProducts = [];
	$scope.AllProducts = [];
	$scope.TempCartProducts = [];

	$http({
		url: window.location.origin+'/ServerPHP/Client/GetAllProducts.php',
		method: "GET",
	})
	.then(function(response) {
		$scope.loading = false;
		$scope.BindGrid = [];
		for (var i = 0; i < response.data.length; i++) {
			$scope.AllProducts.push({"ID":response.data[i].ID ,"Name":response.data[i].Name, "Description":response.data[i].Description, "Price":response.data[i].Price,"InStock":response.data[i].InStock,"Category":response.data[i].CategoryName,"PhotoURL":response.data[i].PhotoURL});
		}
		var j =0;
		for (var i = 0; i < $scope.CartProducts.length; i++) {
			for (j= 0; j < $scope.AllProducts.length; j++) {
				if($scope.AllProducts[j].InStock == 1){
					if($scope.AllProducts[j].Name==$scope.CartProducts[i].Name){
						$scope.FinalCartProducts.push({"Name":$scope.AllProducts[j].Name,"Quantity":$scope.CartProducts[i].Quantity,"Price":$scope.AllProducts[j].Price});
						break;
					}
				}
			}
			if(j < $scope.AllProducts.length){
				$scope.TempCartProducts.push($scope.CartProducts[i]);
			}
		}
		if($scope.TempCartProducts.length!=$scope.CartProducts.length){
			alert('Cart was updated due to unavailiblity of some products!');
			$scope.CartProducts = angular.copy($scope.TempCartProducts);
			localStorage.setItem('RanaSweetsCart', JSON.stringify($scope.CartProducts));
		}
	});

	$scope.add = function (a, b) {
	    return (Number(b.Price)*Number(b.Quantity)) + a;
	}

	$scope.UpdateCartProduct = function () {
		$scope.CartProducts = [];
		for (var i = 0; i < $scope.FinalCartProducts.length; i++) {
			$scope.CartProducts.push({"Name":$scope.FinalCartProducts[i].Name, "Quantity": $scope.FinalCartProducts[i].Quantity});
		}
		localStorage.setItem('RanaSweetsCart', JSON.stringify($scope.CartProducts));
	}

	var currentDate = new Date();
	$scope.DeliveryDates = [];
	for (var i = 0; i < 30; i++) {
		$scope.DeliveryDates.push(currentDate.addDays(1).toDateString());
		if(i==0) $scope.selectedDate = currentDate.toDateString();
	}
	$scope.PlaceOrder={
		"Name":"",
		"Mobile":"",
		"Email":"",
		"DateOfDelivery":"",
		"Address":""
	}
	$scope.PlaceOrderFinal = function () {
		console.log($scope.PlaceOrder);
		console.log($scope.FinalCartProducts);
		$scope.PlaceOrder={
			"Name":"",
			"Mobile":"",
			"Email":"",
			"DateOfDelivery":"",
			"Address":""
		}
		$scope.FinalCartProducts = [];
		$scope.UpdateCartProduct();
	}

 }]);