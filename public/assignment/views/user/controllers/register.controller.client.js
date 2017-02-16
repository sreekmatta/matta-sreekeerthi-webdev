/**
 * Created by sreematta on 2/9/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService,$location) {
        var viewModel = this;

        //event handlers
        viewModel.register = register;

        function register(user) {
            var user = UserService.createUser(user);
            if(user) {
                $location.url("/user/"+user._id);
            } else {
                viewModel.errorMessage = "User not found";
            }
        }
    }
})();