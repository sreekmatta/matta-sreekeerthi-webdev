(function () {
    angular
        .module("HungryOwlAppMaker")
        .controller("RestaurantProfileController", RestaurantProfileController);

    function RestaurantProfileController(RestaurantService, $location, $rootScope, $routeParams) {
        var viewModel = this;
        var rid = $routeParams['rid'];
        viewModel.rid = rid;
        viewModel.currentUser = $rootScope.currentUser;


        viewModel.updateProfile = updateProfile;
        viewModel.searchRestaurants = searchRestaurants;

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
                .updateRestaurant(rid, restaurant)
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

        function searchRestaurants() {
            var resname = $("#resname").val();
            var radius = $("#radius").val();
            $location.url("/restaurant/search/" + radius + "/" + resname);
        }

    }
})();