(function () {
    angular
        .module("HungryOwlAppMaker")
        .controller("AddRestaurantMenuController", AddRestaurantMenuController);

    function AddRestaurantMenuController(RestaurantService,$location,$rootScope,$routeParams) {
        var viewModel = this;
        var rid = $routeParams['rid'];
        viewModel.rid = rid;
        viewModel.currentUser = $rootScope.currentUser;


        viewModel.updateProfile = updateProfile;

        function init() {
            RestaurantService
                .findRestaurantByIdFromDB(rid)
                .then(
                    function successCallback(response) {
                        var restaurant = response.data;
                        viewModel.restaurant = restaurant;
                    },
                    function errorCallback(response) {
                        viewModel.errorMessage = "Restaurant does not exist";
                    }
                );
        }
        init();

        function updateProfile(restaurant) {
            RestaurantService
                .updateRestaurant(rid,restaurant)
                .then(
                    function successCallback(response) {
                        var restaurant = response.data;
                        viewModel.restaurant = restaurant;
                        viewModel.successMessage = "Restaurant Menu updated successfully";
                    },
                    function errorCallback(response) {
                        viewModel.errorMessage = "Restaurant Menu could be updated";
                    }
                );
        }
    }
})();