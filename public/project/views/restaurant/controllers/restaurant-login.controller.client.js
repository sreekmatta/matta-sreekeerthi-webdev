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
            RestaurantService
                .findRestaurantByCredentials(restaurant.username,restaurant.password)
                .then(
                    function successCallback(response) {
                        var restaurant = response.data;
                        $rootScope.currentUser = restaurant;
                        $location.url("/restaurant/" + restaurant._id);
                    },
                    function errorCallback(response) {
                        viewModel.errorMessage = "Restaurant does not exist";
                    }
                );
        }

    }
})();