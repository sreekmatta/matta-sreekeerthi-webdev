(function () {
    angular
        .module("HungryOwlAppMaker")
        .controller("RestaurantRegisterController", RestaurantRegisterController);

    function RestaurantRegisterController(RestaurantService,$location,$rootScope) {
        var viewModel = this;
        viewModel.currentUser = $rootScope.currentUser;

        //event handlers
        viewModel.register = register;

        function register(restaurant) {
            if (restaurant && restaurant.username && restaurant.password
                && restaurant.retypepassword
                && restaurant.email && restaurant.name) {
                if(restaurant.retypepassword === restaurant.password) {

                    RestaurantService
                        .restaurantRegister(restaurant)
                        .then(
                            function (response) {
                                if (response.data != null) {
                                    var restaurant = response.data;
                                    $rootScope.currentUser = restaurant;
                                    $location.url("/restaurant/" + restaurant._id);
                                }
                                else{
                                    viewModel.errorMessage = "Username already exists";
                                }
                            });
                }
            }
            else{
                if(restaurant && restaurant.username && restaurant.password
                    && restaurant.retypepassword
                    && !restaurant.email && restaurant.name)
                    viewModel.errorMessage = "Please enter a valid E-mail Id";
                else
                    viewModel.errorMessage = "All the fields are mandatory";

            }
        }
    }

})();