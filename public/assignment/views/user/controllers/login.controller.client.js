/**
 * Created by sreematta on 2/9/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController(UserService,$location) {
        var viewModel = this;

        //event handlers
        viewModel.login = login;

        function login(user) {
            var promise = UserService
                .findUserByCredentials(user.username, user.password);
            promise.then(function successCallback(response) {
                user = response.data;
                if(user!="") {
                    $location.url("/user/"+user._id);
                } else {
                    viewModel.errorMessage = "User not found";
                }},
                function errorCallback(response) {
                viewModel.errorMessage = "User not found";
                });
        }
    }
})();