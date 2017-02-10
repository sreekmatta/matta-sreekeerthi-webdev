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
        viewModel.login = onLogin;

        function init() {
            //This function is called when this controller
            //is loaded into memory along with respective view
        }
        init();

        function onLogin(user) {
            var user = UserService.findUserByCredentials(user.username,user.password);
            if(user) {
                $location.url("/user/"+user._id);
            } else {
                viewModel.error = "User not found";
            }
        }
    }
})();