Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() + parseInt(days));
    return this;
};

var app = angular.module("RanaSweetsApp", []); 

app.controller('cartController', ['$http','$scope', function($http,$scope){

	$scope.CartProducts = typeof localStorage.getItem('RanaSweetsCart') == "string" &&  localStorage.getItem('RanaSweetsCart') != "undefined" ? JSON.parse(localStorage.getItem('RanaSweetsCart')) : [];
	$scope.FinalCartProducts = [];
	$scope.AllProducts = [
	{"Name":"Gulab Jamun","Price":"360","Description":"very Tasty","InStock":true,"Category":"Sweet"},
	{"Name":"Barfi","Price":"450","Description":"very Tasty","InStock":true,"Category":"Sweet"},
	{"Name":"peda","Price":"800","Description":"very Tasty","InStock":true,"Category":"Sweet"},
	{"Name":"malai Barfi","Price":"120","Description":"very Tasty","InStock":true,"Category":"Sweet"},
	{"Name":"Kaju Katli","Price":"600","Description":"very Tasty","InStock":true,"Category":"Sweet"},
	{"Name":"RasMalai","Price":"700","Description":"very Tasty","InStock":true,"Category":"Sweet"},
	{"Name":"Shev","Price":"220","Description":"very Tasty","InStock":true,"Category":"Farsan"},
	{"Name":"Gathiya","Price":"320","Description":"very Tasty","InStock":true,"Category":"Farsan"}
	];

	for (var i = 0; i < $scope.CartProducts.length; i++) {
		for (var j = 0; j < $scope.AllProducts.length; j++) {
			if($scope.AllProducts[j].Name==$scope.CartProducts[i].Name){
				$scope.FinalCartProducts.push({"Name":$scope.AllProducts[j].Name,"Quantity":$scope.CartProducts[i].Quantity,"Price":$scope.AllProducts[j].Price});
			}
		}
	}

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