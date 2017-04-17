(function () {
    angular
        .module("HungryOwlAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService,$location,$rootScope) {
        var viewModel = this;

        //event handlers
        viewModel.register = register;

        function register(user) {
            if(!user || !user.username || !user.password || !user.retypepassword){
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
            else {
                if(user.retypepassword === user.password){
                    UserService
                        .register(user)
                        .then(
                            function (response) {
                                if (response.data != null) {
                                    var user = response.data;
                                    $rootScope.currentUser = user;
                                    $location.url("/enduser/" + user._id);
                                }
                                else
                                    viewModel.errorMessage = "Username already exists";

                            });
                }
                else{
                    viewModel.errorMessage = "Password and Verify Password donot Match";
                }

            }
        }
    }

})();