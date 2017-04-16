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
                        if(response.data!=null){
                            var user = response.data;
                            $rootScope.currentUser = user;
                            $location.url("/enduser/" + user._id);
                        }
                        else
                            viewModel.errorMessage = "Username already exists";

                    });
        }
        }

})();