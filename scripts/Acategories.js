var app = angular.module("RanaSweetsApp", []); 

app.controller('categoryController', ['$http','$scope','UtilityObject', function($http,$scope,Utility){

    $scope.accessToken = "abcedfghijklmnopqrstuvwxyz";
    $scope.loading = false;

 //declaring the variable
 $scope.AngularGrid = new RSCategory();
 $scope.BindGrid = [];
 $scope.Utility = Utility;
 $scope.PageSize = 10;
 $scope.currentPage = 1;
 $scope.PagingMessage = "";

 $scope.AlterCategory = new RSCategory();

 function Error(Message) {
    alert(Message);
}

    //Function to bind Angular Grid
    $scope.loadGrid = function (Index) {
        $scope.loading = true;
        $http({
            url: window.location.origin+'/ServerPHP/Admin/GetAllCategories.php?PageIndex='+Index+'&PageSize='+$scope.PageSize,
            method: "GET",
        })
        .then(function(response) {
            $scope.loading = false;
            $scope.BindGrid = [];
            for (var i = 0; i < response.data.length; i++) {
                $scope.BindGrid.push({"ID":response.data[i].ID ,"Name":response.data[i].Name,"IsActive":response.data[i].IsActive,"CreatedOn":response.data[i].CreatedOn,"LastUpdatedOn":response.data[i].LastUpdatedOn});
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

    $scope.DeleteCategory = function (categoryName,categoryID) {
        if(confirm('Are you sure you want to delete '+categoryName+ ' ? Deleting Category will delete all linked products!')){
            $http({
            url: window.location.origin+'/ServerPHP/Admin/DeleteCategories.php',
            method: "POST",
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            data:{"ID":productID}
            })
            .then(function(categoryID) {
                if(response.data[0].Result=="True"){
                    alert('Category and Products Related Deleted Successfully!');
                    $scope.loadGrid(1);
                } else {
                    alert('Category and Products Related Deletion Failed!');
                }
            });
        }
    };

    $scope.InitAddNewCategory =function () {
        $scope.AlterCategory = new RSCategory();
    // Get the modal
    var modal = document.getElementById('myModal');
    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");
    modal.style.display = "block";
};

$scope.InitEditNewCategory =function (currentCategory) {
    $scope.AlterCategory = angular.copy(currentCategory);
    // Get the modal
    var modal = document.getElementById('myModal');
    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");
    modal.style.display = "block";
};

$scope.ModalSave = function () {
    $http({
            url: window.location.origin+'/ServerPHP/Admin/PostCategories.php',
            method: "POST",
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            data:$scope.AlterCategory
        })
        .then(function(response) {
            if(response.data[0].Result=="True"){
                alert('Data Updated Successfully!');
                $scope.loadGrid(1);
                 $scope.AlterCategory = new RSCategory();
                 document.getElementById('myModal').style.display = "none";
            } else {
                alert('Data Updation Failed!');
            }
        });
}

}]);
app.service("UtilityObject", Utility);