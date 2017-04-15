(function () {
    angular
        .module("HungryOwlAppMaker")
        .controller("LoginController", LoginController);

    function LoginController(UserService,$location,$rootScope) {
        var viewModel = this;

        //event handlers
        viewModel.login = login;

        function login(user) {
            UserService
                .findUserByCredentials(user.username,user.password)
                .then(
                    function successCallback(response) {
                        var user = response.data;
                        $rootScope.currentUser = user;
                        $location.url("/enduser/" + user._id);
                    },
                    function errorCallback(response) {
                        viewModel.errorMessage = "User does not exist";
                    }
                );
        }

    }
})();