(function () {
    angular
        .module("HungryOwlAppMaker")
        .controller("LoginController", LoginController);

    function LoginController(UserService,$location,$rootScope,$route) {
        var viewModel = this;

        //event handlers
        viewModel.login = login;

        function login(user) {
            if(!user || !user.username || !user.password){
                if(!user)
                    viewModel.errorMessage = "Username and Password cannot be empty";
                else if(user.password){
                    if(!user.password)
                        viewModel.errorMessage = "Username and Password cannot be empty";
                    else
                        viewModel.errorMessage = "Username cannot be empty";
                }
                else{
                    if(!user.username)
                        viewModel.errorMessage = "Username and Password cannot be empty";
                    else
                        viewModel.errorMessage = "Password cannot be empty";
                }
            }
            else{
                UserService
                    .login(user)
                    .then(
                        function successCallback(response) {
                            var user = response.data;
                            $rootScope.currentUser = user;
                            $location.url("/enduser/" + user._id);
                        },
                        function errorCallback(response) {
                            viewModel.errorMessage = "Enter Credentials are not Valid";
                        }
                    );
            }

        }

    }
})();