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
            var user = UserService.findUserByCredentials(user.username,user.password);
            if(user) {
                $location.url("/user/"+user._id);
            } else {
                viewModel.errorMessage = "User not found";
            }
        }
    }
})();