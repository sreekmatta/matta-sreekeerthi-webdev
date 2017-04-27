(function () {
    angular
        .module("HungryOwlAppMaker")
        .controller("ManageUserController", ManageUserController);

    function ManageUserController($location,$routeParams,$rootScope,UserService,$route,PostService) {
        var viewModel = this;
        viewModel.currentUser = $rootScope.currentUser;
        var userId = viewModel.currentUser._id;

        viewModel.userId = userId;

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
                            if(user.userType=="ADMIN")
                                viewModel.isAdmin = true;
                            else
                                viewModel.isAdmin = false;
                        } else {
                            viewModel.errorMessage = "Error while loading enduser by ID:" + userId;
                        }
                    }
                );
            }
        }
        init();


        function createUser(user) {

            if(user && user.username && user.password && user.retypepassword
                && user.email && user.lastName && user.firstName)
            {
                if(user.retypepassword === user.password){
                    UserService.findUserByUsername(user.username)
                        .then(
                            function (response) {
                                var userExists = response.data;
                                if(userExists){
                                    viewModel.errorMessage = "Username already exists";
                                }
                                else{
                                    UserService
                                        .createUser(user)
                                        .then(
                                            function (response) {
                                                if(response.status==200){
                                                    viewModel.successMessage = "User created successfully";
                                                }
                                                else
                                                    viewModel.errorMessage = "Sorry, error occurred while creating User";

                                            });
                                }
                            }
                        );
                }
                else{
                    viewModel.errorMessage = "Password and Verify Password donot Match";
                }

            }
            else
            {
                if(user && user.username && user.password && user.retypepassword
                    && !user.email && user.lastName && user.firstName)
                    viewModel.errorMessage = "Please enter a valid E-mail Id";
                else
                    viewModel.errorMessage = "All the fields are mandatory";
            }

        }

        function updateUser(user,isAdmin) {

            if(user && user.username && user.password
                && user.email && user.lastName && user.firstName)
            {
                if(isAdmin)
                    user.userType = "ADMIN";

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
            else
            {
                if(user && user.username && user.password && !user.email && user.lastName && user.firstName)
                    viewModel.errorMessage = "Please enter a valid E-mail Id";
                else
                    viewModel.errorMessage = "All the fields are mandatory";
            }
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
                .then(function successCallback() {
                        $route.reload();
                    },
                    function errorCallback() {
                        $route.reload();
                    })
        }

    }
})();