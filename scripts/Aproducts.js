var app = angular.module("RanaSweetsApp", []); 

app.controller('productController', ['$http','$scope','UtilityObject', function($http,$scope,Utility){

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
 $scope.AngularGrid = new RSProduct();
 $scope.BindGrid = [];
 $scope.Utility = Utility;
 $scope.PageSize = 10;
 $scope.currentPage = 1;
 $scope.PagingMessage = "";

 $scope.RanaSweetsAT = typeof localStorage.getItem('RanaSweetsAT') == "string" &&  localStorage.getItem('RanaSweetsAT') != "undefined" ? localStorage.getItem('RanaSweetsAT') : "";

    if($scope.RanaSweetsAT.length == 100){
        $http({
                url: window.location.origin+'/ServerPHP/Admin/ValidateAuthToken.php',
                method: "POST",
                data: { 'Token':$scope.RanaSweetsAT}
            })
      .then(function(response) {
                // success
                if(response.data[0].Result=="True"){

                } else {
                    console.log(response);
                    localStorage.setItem('RanaSweetsAT','');
                    window.location = window.location.origin+'/Admin/index.html';
                }
            }).catch(function(response) { 
                // failure
                console.log(response);
                localStorage.setItem('RanaSweetsAT','');
                window.location = window.location.origin+'/Admin/index.html';
            });
        } else {
            localStorage.setItem('RanaSweetsAT','');
            window.location = window.location.origin+'/Admin/index.html';
        }

 $scope.AlterProduct = new RSProduct();

 function Error(Message) {
    alert(Message);
}

    //Function to bind Angular Grid
    $scope.loadGrid = function (Index) {
        $scope.loading = true;
        $http({
            url: window.location.origin+'/ServerPHP/Admin/GetAllProducts.php?PageIndex='+Index+'&PageSize='+$scope.PageSize,
            method: "GET",
        })
        .then(function(response) {
            $scope.loading = false;
            $scope.BindGrid = [];
            for (var i = 0; i < response.data.length; i++) {
                if(!(response.data[i].PhotoURL=="" || response.data[i].PhotoURL== null || response.data[i].PhotoURL=="undefined")){
                    response.data[i].PhotoURL = "default.png";
                }
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
        $scope.RanaSweetsAT = typeof localStorage.getItem('RanaSweetsAT') == "string" &&  localStorage.getItem('RanaSweetsAT') != "undefined" ? localStorage.getItem('RanaSweetsAT') : "";
        if(confirm('Are you sure you want to delete '+productName+ ' ?')){
            $http({
            url: window.location.origin+'/ServerPHP/Admin/DeleteProducts.php',
            method: "POST",
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            data:{"ID":productID,'Token':$scope.RanaSweetsAT}
            })
            .then(function(response) {
                if(response.data[0].Result=="-1"){
                    localStorage.setItem('RanaSweetsAT','');
                    window.location = window.location.origin+'/Admin/index.html';
                }
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
    $scope.RanaSweetsAT = typeof localStorage.getItem('RanaSweetsAT') == "string" &&  localStorage.getItem('RanaSweetsAT') != "undefined" ? localStorage.getItem('RanaSweetsAT') : "";
    $scope.AlterProduct.Token=$scope.RanaSweetsAT;
    $http({
            url: window.location.origin+'/ServerPHP/Admin/PostProducts.php',
            method: "POST",
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            data:$scope.AlterProduct
        })
        .then(function(response) {
            if(response.data[0].Result=="-1"){
                localStorage.setItem('RanaSweetsAT','');
                window.location = window.location.origin+'/Admin/index.html';
            }
            if(response.data[0].Result=="True"){
                alert('Data Updated Successfully!');
                $scope.loadGrid(1);
                 $scope.AlterProduct = new RSProduct();
                 document.getElementById('myModal').style.display = "none";
            } else {
                alert('Data Updation Failed!');
            }
        });
}
$scope.Logout = function () {
    $http({
            url: window.location.origin+'/ServerPHP/Admin/Logout.php',
            method: "POST",
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            data:{'Token':$scope.RanaSweetsAT}
        })
        .then(function(response) {
            if(response.data[0].Result=="True"){
                localStorage.setItem('RanaSweetsAT','');
                window.location = window.location.origin+'/Admin/index.html';
            } else {
                console.log(response);
                alert('Not able to Logout! Contact Sysadmin ASAP.');
            }
        });
}

}]);
app.service("UtilityObject", Utility);