var app = angular.module("RanaSweetsApp", []); 

app.controller('cartController', ['$http','$scope', function($http,$scope){

	$scope.range = function(min, max, step) {
    	step = step || 1;
	    var input = [0];
	    for (var i = min; i <= max; i += step) {
	        input.push(i);
	    }
	    return input;
	};

	$scope.Categories = [];
	$scope.CartProducts = [];

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

	$scope.DispalyProducts = angular.copy($scope.AllProducts);

	$scope.AddToCart = function(productName, Quantity){
		for (var i = 0; i <$scope.CartProducts.length; i++) {
			if($scope.CartProducts[i].Name == productName){
				$scope.CartProducts[i].Quantity = Number($scope.CartProducts[i].Quantity) + Number(Quantity);
				return;
			};
		}
		$scope.CartProducts.push({"Name":productName,"Quantity":Number(Quantity)});
		localStorage.setItem('RanaSweetsCart', JSON.stringify($scope.CartProducts));
	};

 }]);