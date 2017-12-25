var app = angular.module("RanaSweetsApp", []); 

app.controller('orderController', ['$http','$scope','UtilityObject', function($http,$scope,Utility){

    $scope.accessToken = "abcedfghijklmnopqrstuvwxyz";
    $scope.loading = false;

    $scope.Categories = [];
    $http({
        url: window.location.origin+'/ServerPHP/Admin/GetAllCategories.php?PageIndex=1&PageSize=1000',
        method: "GET",
    })
    .then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            $scope.Categories.push(response.data[i].Name);
        }
    });

 //declaring the variable
 $scope.AngularGrid = new RSOrder();
 $scope.BindGrid = [];
 $scope.Utility = Utility;
 $scope.PageSize = 10;
 $scope.currentPage = 1;
 $scope.PagingMessage = "";

 $scope.AlterProduct = new RSOrder();

 function Error(Message) {
    alert(Message);
}

    //Function to bind Angular Grid
    $scope.loadGrid = function (Index) {
        $scope.loading = true;
        $http({
            url: window.location.origin+'/ServerPHP/Admin/GetAllOrders.php?PageIndex='+Index+'&PageSize='+$scope.PageSize,
            method: "GET",
        })
        .then(function(response) {
            $scope.loading = false;
            $scope.BindGrid = [];
            for (var i = 0; i < response.data.length; i++) {
                $scope.BindGrid.push({"ID":response.data[i].ID ,
                    "Name":response.data[i].Name, 
                    "Mobile":response.data[i].Mobile, 
                    "Email":response.data[i].Email,
                    "DateOfDelivery":response.data[i].DateOfDelivery,
                    "Address":response.data[i].Address,
                    "TotalCost":response.data[i].TotalCost,
                    "DiscountPercentage":response.data[i].DiscountPercentage,
                    "FinalCost":response.data[i].FinalCost,
                    "FinalCartProducts":JSON.Parse(response.data[i].SubOrderProducts),
                    "IsDelivered":response.data[i].IsDelivered,
                    "IsActive":response.data[i].IsActive,
                    "CreatedOn":response.data[i].CreatedOn,
                    "LastUpdatedOn":response.data[i].LastUpdatedOn});
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
            $http({
                url: window.location.origin+'/ServerPHP/Admin/DeleteProducts.php',
                method: "POST",
                headers: {
                  'Content-Type': 'multipart/form-data'
              },
              data:{"ID":productID}
          })
            .then(function(response) {
                if(response.data[0].Result=="True"){
                    alert('Product Deleted Successfully!');
                    $scope.loadGrid(1);
                } else {
                    alert('Product Deletion Failed!');
                }
            });
        }
    };

    $scope.InitAddNewProduct =function () {
        $scope.AlterProduct = new RSOrder();
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
    $http({
        url: window.location.origin+'/ServerPHP/Admin/PostProducts.php',
        method: "POST",
        headers: {
          'Content-Type': 'multipart/form-data'
      },
      data:$scope.AlterProduct
  })
    .then(function(response) {
        if(response.data[0].Result=="True"){
            alert('Data Updated Successfully!');
            $scope.loadGrid(1);
            $scope.AlterProduct = new RSOrder();
            document.getElementById('myModal').style.display = "none";
        } else {
            alert('Data Updation Failed!');
        }
    });
}

}]);
app.service("UtilityObject", Utility);