var app = angular.module("RanaSweetsApp", []); 

app.controller('mainController', ['$http','$scope', function($http,$scope){

	$scope.range = function(min, max, step) {
		step = step || 1;
		var input = [0];
		for (var i = min; i <= max; i += step) {
			input.push(i);
		}
		return input;
	};

	$scope.Categories = [];
	$scope.loading = true;
	$scope.CartProducts = typeof localStorage.getItem('RanaSweetsCart') == "string" &&  localStorage.getItem('RanaSweetsCart') != "undefined" ? JSON.parse(localStorage.getItem('RanaSweetsCart')) : [];

	$scope.AllProducts = [];
	$http({
		url: window.location.origin+'/ServerPHP/Client/GetAllProducts.php',
		method: "GET",
	})
	.then(function(response) {
		document.getElementById("loadingPAGE").style.display="none";
		document.getElementById("mainPAGE").style.display="block";
		$scope.loading = false;
		$scope.BindGrid = [];
		for (var i = 0; i < response.data.length; i++) {
			console.log(response.data[i].PhotoURL);
            if(response.data[i].PhotoURL=="" || response.data[i].PhotoURL== null || response.data[i].PhotoURL=="undefined" || response.data[i].PhotoURL==undefined){
				response.data[i].PhotoURL = "default.png";
            } else {
                
            }
			$scope.AllProducts.push({"ID":response.data[i].ID ,"Name":response.data[i].Name, "Description":response.data[i].Description, "Price":response.data[i].Price,"InStock":response.data[i].InStock,"Category":response.data[i].CategoryName,"PhotoURL":response.data[i].PhotoURL});
		}
		$scope.DispalyProducts = angular.copy($scope.AllProducts);
	});

	$http({
		url: window.location.origin+'/ServerPHP/Client/GetAllCategories.php',
		method: "GET",
	})
	.then(function(response) {
		for (var i = 0; i < response.data.length; i++) {
			$scope.Categories.push({"Name":response.data[i].Name,"IsSelected":true});
		}
	});

	$scope.AddToCart = function(productName, Quantity){
		for (var i = 0; i <$scope.CartProducts.length; i++) {
			if($scope.CartProducts[i].Name == productName){
				$scope.CartProducts[i].Quantity = Number($scope.CartProducts[i].Quantity) + Number(Quantity);
				localStorage.setItem('RanaSweetsCart', JSON.stringify($scope.CartProducts));
				return;
			};
		}
		$scope.CartProducts.push({"Name":productName,"Quantity":Number(Quantity)});
		localStorage.setItem('RanaSweetsCart', JSON.stringify($scope.CartProducts));
	};

	$scope.FilterProductsCategories = function(){
		var SelectedCat = [];
		$scope.DispalyProducts = [];
		for (var i = 0; i < $scope.Categories.length; i++) {
			if($scope.Categories[i].IsSelected)	SelectedCat.push($scope.Categories[i].Name);
		}
		for (var i = 0; i < $scope.AllProducts.length; i++) {
			if(SelectedCat.indexOf($scope.AllProducts[i].Category) > -1) $scope.DispalyProducts.push($scope.AllProducts[i]);
		}
	};
}]);