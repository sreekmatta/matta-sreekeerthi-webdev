(function () {
    angular
        .module("HungryOwlAppMaker")
        .controller("LogoutController", LogoutController);

    function LogoutController(UserService,$location,$rootScope,$scope) {
        var viewModel = this;
        //event handlers
        viewModel.logout = logout;

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $location.url("/");
                    }
                    );
        }
        logout();

    }
})();