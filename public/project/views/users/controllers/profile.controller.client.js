(function () {
    angular
        .module("HungryOwlAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService,$routeParams,$rootScope,$location) {
        var viewModel = this;

        viewModel.currentUser = $rootScope.currentUser;
        var userId = viewModel.currentUser._id;
        viewModel.userId = userId;


        //event handlers
        viewModel.updateUser = updateUser;
        viewModel.deleteUser = deleteUser;

        function init() {
            var promise = UserService.findUserById(userId);
            promise.then(
                function (user) {
                    user = user.data;
                    if(user!= undefined) {
                        user.retypepassword = user.password;
                        viewModel.user = user;
                    } else {
                        viewModel.errorMessage = "Error while loading enduser by ID:" + userId;
                    }
                }
            );
        }
        init();

        function updateUser(user) {
            if(user && user.username && user.password && user.retypepassword
                && user.email && user.lastName && user.firstName){

                if(user.retypepassword === user.password) {
                    var promise = UserService.updateUser(userId, user);
                    promise.then(
                        function successCallback(response) {
                            if (response.status == 200) {
                                $rootScope.currentUser = user;
                                viewModel.successMessage = "Profile updated successfully";
                                viewModel.errorMessage = undefined;
                            } else {
                                viewModel.errorMessage = "Error while updating enduser by ID:" + userId;
                            }
                        },
                        function errorCallback(response) {
                            viewModel.errorMessage = "Error while updating enduser by ID:" + userId;
                        });
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

        function deleteUser() {
            var promise = UserService.updateUser(userId,user);
            promise.then(
                function successCallback(response) {
                    if(response.status == 200) {
                        viewModel.successMessage = "Profile updated successfully";
                    } else {
                        viewModel.errorMessage = "Error while updating enduser by ID:" + userId;
                    }
                },
                function errorCallback(response) {
                    viewModel.errorMessage = "Error while updating enduser by ID:" + userId;
                });
        }


    }
})();