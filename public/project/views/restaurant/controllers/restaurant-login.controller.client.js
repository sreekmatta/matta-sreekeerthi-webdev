(function () {
    angular
        .module("HungryOwlAppMaker")
        .controller("RestaurantLoginController", RestaurantLoginController);

    function RestaurantLoginController(RestaurantService,$location,$rootScope) {
        var viewModel = this;
        viewModel.currentUser = $rootScope.currentUser;

        //event handlers
        viewModel.login = login;

        function login(restaurant) {
            if(!restaurant || !restaurant.username || !restaurant.password){
                if(!restaurant)
                    viewModel.errorMessage = "Username and Password cannot be empty";
                else if(restaurant.password){
                    if(!restaurant.password)
                        viewModel.errorMessage = "Username and Password cannot be empty";
                    else
                        viewModel.errorMessage = "Username cannot be empty";
                }
                else{
                    if(!restaurant.username)
                        viewModel.errorMessage = "Username and Password cannot be empty";
                    else
                        viewModel.errorMessage = "Password cannot be empty";
                }
            }
            else{
                RestaurantService
                    .findRestaurantByCredentials(restaurant.username,restaurant.password)
                    .then(
                        function successCallback(response) {
                            var restaurant = response.data;
                            if(restaurant){
                                $rootScope.currentUser = restaurant;
                                $location.url("/restaurant/" + restaurant._id);
                            }
                            else{
                                viewModel.errorMessage = "Invalid Credentials For Restaurant";
                            }
                        },
                        function errorCallback(response) {
                            viewModel.errorMessage = "Invalid Credentials For Restaurant";
                        }
                    );

            }
        }

    }
})();