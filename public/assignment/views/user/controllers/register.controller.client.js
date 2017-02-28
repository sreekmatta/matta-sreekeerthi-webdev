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
            var promise = UserService.createUser(user);
            promise.then(function successCallback(response) {
                    user = response.data;
                    if(user) {
                        $location.url("/user/"+user._id);
                    } else {
                        viewModel.errorMessage = "User not created";
                    }
            },
                function errorCallback(response) {
                    viewModel.errorMessage = "User not created";
                });
        }
    }
})();