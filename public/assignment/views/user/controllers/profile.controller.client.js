/**
 * Created by sreematta on 2/9/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService,$routeParams) {
        var viewModel = this;

        //event handlers
        viewModel.updateUser = updateUser;
        viewModel.deleteUser = deleteUser;

        function init() {
            var userId = $routeParams['uid'];
            var promise = UserService.findUserById(userId);
            promise.then(
                function (user) {
                    user = user.data;
                    if(user!= undefined) {
                        viewModel.user = user;
                    } else {
                        viewModel.errorMessage = "Error while loading user by ID:" + userId;
                    }
                }
            );
        }
        init();

        function updateUser(user) {
            var userId = $routeParams['uid'];
            var promise = UserService.updateUser(userId,user);
            promise.then(
                function successCallback(response) {
                    if(response.status == 200) {
                        viewModel.successMessage = "Profile updated successfully";
                    } else {
                        viewModel.errorMessage = "Error while updating user by ID:" + userId;
                    }
                },
                function errorCallback(response) {
                    viewModel.errorMessage = "Error while updating user by ID:" + userId;
                });
        }

        function deleteUser() {
            var userId = $routeParams['uid'];
            var promise = UserService.updateUser(userId,user);
            promise.then(
                function successCallback(response) {
                    if(response.status == 200) {
                        viewModel.successMessage = "Profile updated successfully";
                    } else {
                        viewModel.errorMessage = "Error while updating user by ID:" + userId;
                    }
                },
                function errorCallback(response) {
                    viewModel.errorMessage = "Error while updating user by ID:" + userId;
                });
        }
    }
})();