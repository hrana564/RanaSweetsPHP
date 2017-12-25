var app = angular.module("RanaSweetsApp", []); 

app.controller('productController', ['$http','$scope','UtilityObject', function($http,$scope,Utility){

    $scope.accessToken = "abcedfghijklmnopqrstuvwxyz";

    $scope.Categories = [];
    $http({
        url: window.location.origin+'/ServerPHP/Admin/GetAllCategories.php',
        method: "GET",
    })
    .then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            $scope.Categories.push(response.data[i].Name);
        }
    });

 //declaring the variable
 $scope.AngularGrid = new RSProduct();
 $scope.BindGrid = [];
 $scope.Utility = Utility;
 $scope.PageSize = 10;
 $scope.currentPage = 1;
 $scope.PagingMessage = "";

 $scope.AlterProduct = new RSProduct();

 function Error(Message) {
    alert(Message);
}

    //Function to bind Angular Grid
    $scope.loadGrid = function (Index) {
        $http({
            url: window.location.origin+'/ServerPHP/Admin/GetAllProducts.php?PageIndex='+Index+'&PageSize='+$scope.PageSize,
            method: "GET",
        })
        .then(function(response) {
            $scope.BindGrid = [];
            for (var i = 0; i < response.data.length; i++) {
                $scope.BindGrid.push({"ID":response.data[i].ID ,"Name":response.data[i].Name, "Description":response.data[i].Description, "Price":response.data[i].Price,"InStock":response.data[i].InStock,"Category":response.data[i].CategoryName,"PhotoURL":response.data[i].PhotoURL,"IsActive":response.data[i].IsActive,"CreatedOn":response.data[i].CreatedOn,"LastUpdatedOn":response.data[i].LastUpdatedOn});
            }
            $scope.VirtualItemCount = response.data[0].VirtualItemCount;
            $scope.PagingMessage = $scope.Utility.Paging(response.data[0].VirtualItemCount, $scope.PageSize, Index);
            $scope.currentPage = Index;
        });
    }
    $scope.loadGrid(1);

    $scope.sortBy = function (propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };

    $scope.prevPage = function () {
        $scope.loadGrid($scope.Utility.prevPage($scope.currentPage));
    };

    $scope.nextPage = function () {
        $scope.loadGrid($scope.Utility.nextPage($scope.currentPage, $scope.VirtualItemCount, $scope.PageSize, 10));
    }

    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

    $scope.DeleteProduct = function (productName,productID) {
        if(confirm('Are you sure you want to delete '+productName+ ' ?')){
            console.log('Deleted product with Product ID '+productID+' Successfully');
            $scope.loadGrid(1);
        }
    };

    $scope.InitAddNewProduct =function () {
        $scope.AlterProduct = new RSProduct();
    // Get the modal
    var modal = document.getElementById('myModal');
    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");
    modal.style.display = "block";
};

$scope.InitEditNewProduct =function (currentProduct) {
    $scope.AlterProduct = angular.copy(currentProduct);
    // Get the modal
    var modal = document.getElementById('myModal');
    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");
    modal.style.display = "block";
};

$scope.ModalSave = function () {
    console.log($scope.AlterProduct);
    $http({
            url: window.location.origin+'/ServerPHP/Admin/PostProducts.php',
            method: "POST",
            headers: {
               'Content-Type': undefined
             },
            data:$scope.AlterProduct
        })
        .then(function(response) {
            if(response.data[0].Result=="True"){
                alert('Data Updated Successfully!');
                $scope.loadGrid(1);
                 $scope.AlterProduct = new RSProduct();
            } else {
                alert('Data Updation Failed!');
            }
        });
}

}]);
app.service("UtilityObject", Utility);