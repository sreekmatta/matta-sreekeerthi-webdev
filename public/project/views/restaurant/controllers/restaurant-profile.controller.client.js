(function () {
    angular
        .module("HungryOwlAppMaker")
        .controller("RestaurantProfileController", RestaurantProfileController);

    function RestaurantProfileController(RestaurantService, $location, $rootScope, $routeParams) {
        var viewModel = this;
        viewModel.currentUser = $rootScope.currentUser;
        var rid = viewModel.currentUser._id;
        viewModel.rid = rid;


        viewModel.updateProfile = updateProfile;
        viewModel.searchRestaurants = searchRestaurants;

        function init() {
            RestaurantService
                .findRestaurantByIdFromDB(rid)
                .then(
                    function successCallback(response) {
                        var restaurant = response.data;
                        restaurant = restaurant[0];
                        restaurant.retypepassword = restaurant.password;
                        viewModel.restaurant = restaurant;
                    },
                    function errorCallback(response) {
                        viewModel.errorMessage = "Restaurant does not exist";
                    }
                );
        }

        init();

        function updateProfile(restaurant) {
            if (restaurant && restaurant.username && restaurant.password
                && restaurant.retypepassword
                && restaurant.email && restaurant.name) {
                if(restaurant.retypepassword === restaurant.password) {

                    RestaurantService
                        .updateRestaurant(rid, restaurant)
                        .then(
                            function successCallback(response) {
                                var restaurant = response.data;
                                viewModel.restaurant = restaurant;
                                viewModel.successMessage = "Restaurant details updated Successfully"
                            },
                            function errorCallback(response) {
                                viewModel.errorMessage = "Restaurant does not exist";
                            }
                        );
                }}
            else{
                if(restaurant && restaurant.username && restaurant.password
                    && restaurant.retypepassword
                    && !restaurant.email && restaurant.name)
                    viewModel.errorMessage = "Please enter a valid E-mail Id";
                else
                    viewModel.errorMessage = "All the fields are mandatory";

            }
        }

        function searchRestaurants() {
            var resname = $("#resname").val();
            var radius = $("#radius").val();
            $location.url("/restaurant/search/" + radius + "/" + resname);
        }

    }
})();