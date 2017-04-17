(function () {
    angular
        .module("HungryOwlAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService,$routeParams,$rootScope,$location) {
        var viewModel = this;
        var userId = $routeParams['uid'];
        viewModel.userId = userId;
        viewModel.currentUser = $rootScope.currentUser;

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
                        viewModel.errorMessage = "Error while loading enduser by ID:" + userId;
                    }
                }
            );
        }
        init();

        function updateUser(user) {
            var promise = UserService.updateUser(userId,user);
            promise.then(
                function successCallback(response) {
                    if(response.status == 200) {
                        $rootScope.currentUser = user;
                        viewModel.successMessage = "Profile updated successfully";
                    } else {
                        viewModel.errorMessage = "Error while updating enduser by ID:" + userId;
                    }
                },
                function errorCallback(response) {
                    viewModel.errorMessage = "Error while updating enduser by ID:" + userId;
                });
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