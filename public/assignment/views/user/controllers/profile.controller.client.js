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

        function init() {
            var userId = $routeParams['uid'];
            var user = UserService.findUserById(userId);

            if(user!= undefined) {
                viewModel.user = user;
            } else {
                viewModel.errorMessage = "Error while loading user by ID:" + userId;
            }
        }
        init();

        function updateUser(user) {
            var userId = $routeParams['uid'];
            var user = UserService.updateUser(userId,user);
            if(user!= undefined) {
                viewModel.successMessage = "Profile updated successfully";
            } else {
                viewModel.errorMessage = "Error while updating user by ID:" + userId;
            }
        }
    }
})();