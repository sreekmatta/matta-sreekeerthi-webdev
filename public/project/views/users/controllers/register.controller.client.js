/**
 * Created by sreematta on 2/9/2017.
 */
(function () {
    angular
        .module("HungryOwlAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService,$location,$rootScope) {
        var viewModel = this;

        //event handlers
        viewModel.register = register;

        function register(user) {
            UserService
                .register(user)
                .then(
                    function (response) {
                        var user = response.data;
                        $rootScope.currentUser = user;
                        $location.url("/enduser/" + user._id);
                    });
        }
        }

})();