(function () {
    angular
        .module("HungryOwlAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService,$location,$rootScope) {
        var viewModel = this;
        viewModel.currentUser = $rootScope.currentUser;

        //event handlers
        viewModel.register = register;

        function register(user) {

            if(user && user.username && user.password && user.retypepassword
                && user.email && user.lastName && user.firstName)
            {
                if(user.retypepassword === user.password){
                    UserService
                        .register(user)
                        .then(
                            function (response) {
                                if (response.data != null) {
                                    var user = response.data;
                                    $rootScope.currentUser = user;
                                    $location.url("/enduser");
                                }
                                else
                                    viewModel.errorMessage = "Username already exists";

                            });
                }
                else{
                    viewModel.errorMessage = "Password and Verify Password donot Match";
                }

            }
            else
            {
                if(user && user.username && user.password && user.retypepassword
                    && !user.email && user.lastName && user.firstName)
                    viewModel.errorMessage = "Please enter a valid E-mail Id";
                else
                    viewModel.errorMessage = "All the fields are mandatory";
            }
        }
    }

})();