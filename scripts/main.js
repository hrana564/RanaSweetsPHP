var app = angular.module("RanaSweetsApp", []); 

app.controller('mainController', ['$http','$scope', function($http,$scope){

	$scope.AllProducts = [
	{"Name":"Gulab Jamun","Price":"360","Description":"very Tasty","InStock":true},
	{"Name":"Barfi","Price":"450","Description":"very Tasty","InStock":true},
	{"Name":"peda","Price":"800","Description":"very Tasty","InStock":true},
	{"Name":"malai Barfi","Price":"120","Description":"very Tasty","InStock":true},
	{"Name":"Kaju Katli","Price":"600","Description":"very Tasty","InStock":true},
	{"Name":"RasMalai","Price":"700","Description":"very Tasty","InStock":true},
	{"Name":"Basundi","Price":"220","Description":"very Tasty","InStock":true},
	{"Name":"Gulab Jamun","Price":"320","Description":"very Tasty","InStock":true}
	];
	
 }]);