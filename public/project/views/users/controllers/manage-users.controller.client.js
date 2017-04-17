(function () {
    angular
        .module("HungryOwlAppMaker")
        .controller("ManageUserController", ManageUserController);

    function ManageUserController($location,$routeParams,$rootScope,UserService,$route,PostService) {
        var viewModel = this;
        var userId = $routeParams['uid'];
        viewModel.userId = userId;
        viewModel.currentUser = $rootScope.currentUser;
        var nuId = $routeParams['userId'];

        viewModel.searchRestaurants = searchRestaurants;
        viewModel.searchUsers = searchUsers;
        viewModel.deleteUser = deleteUser;
        viewModel.createUser = createUser;
        viewModel.updateUser = updateUser;

        function init() {
            UserService
                .findAllUsers()
                .then(
                    function (response) {
                        viewModel.allUsers = response.data;
                    });

            if(nuId){
            var promise = UserService.findUserById(nuId);
            promise.then(
                function (user) {
                    user = user.data;
                    if(user!= undefined) {
                        viewModel.user = user;
                    } else {
                        viewModel.errorMessage = "Error while loading enduser by ID:" + userId;
                    }
                }
            );
            }
        }
        init();


        function createUser(user) {
            UserService
                .register(user)
                .then(
                    function (response) {
                        if(response.status==200){
                            viewModel.successMessage = "User created successfully";
                        }
                        else
                            viewModel.errorMessage = "Username already exists";

                    });
        }

        function updateUser(user) {
            var promise = UserService.updateUser(nuId,user);
            promise.then(
                function successCallback(response) {
                    if(response.status == 200) {
                        viewModel.successMessage = "User Profile updated successfully";
                    } else {
                        viewModel.errorMessage = "Error while updating enduser by ID:" + userId;
                    }
                },
                function errorCallback(response) {
                    viewModel.errorMessage = "Error while updating enduser by ID:" + userId;
                });
        }

        function searchRestaurants() {
            var resname = $( "#resname").val();
            var radius = $( "#radius").val();
            $location.url("/restaurant/search/"+radius+"/"+resname);
        }

        function searchUsers() {
            var input, filter, table, tr, td, i;
            input = document.getElementById("myInput");
            filter = input.value.toUpperCase();
            table = document.getElementById("myTable");
            tr = table.getElementsByTagName("tr");
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[0];
                if (td) {
                    if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
        }

        function deleteUser(userId){
            UserService.deleteUser(userId)
                .then(
                    function(response){
                        if(response.status==200){
                            viewModel.successMessage = "User with userID: "+userId+" deleted" +
                                "successfully";
                        }
                        else{
                            viewModel.errorMessage = "Error occurred while deleting User."
                        }
                    }
                );

            PostService.DeleteAllPostsByUser(userId)
                .then(function () {
                    $route.reload();
                    console.log("Delete Success");
                })
        }

    }
})();