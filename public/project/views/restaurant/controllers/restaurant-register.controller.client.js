/**
 * Created by sreematta on 2/9/2017.
 */
(function () {
    angular
        .module("HungryOwlAppMaker")
        .controller("RestaurantRegisterController", RestaurantRegisterController);

    function RestaurantRegisterController(RestaurantService,$location,$rootScope) {
        var viewModel = this;

        //event handlers
        viewModel.register = register;

        function register(restaurant) {
            RestaurantService
                .restaurantRegister(restaurant)
                .then(
                    function (response) {
                        var restaurant = response.data;
                        $rootScope.currentUser = restaurant;
                        $location.url("/restaurant/" + restaurant._id);
                    });
        }
    }

})();