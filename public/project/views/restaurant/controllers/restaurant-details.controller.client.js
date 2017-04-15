(function () {
    angular
        .module("HungryOwlAppMaker")
        .controller("RestaurantDetailsController", RestaurantDetailsController);

    function RestaurantDetailsController(PostService,RestaurantService,$location,$rootScope,$routeParams) {
        var viewModel = this;
        var resId = $routeParams['resid'];
        var resName = $routeParams['resName'];
        viewModel.resId = resId;
        viewModel.resName = resName;


        var rid = $routeParams['rid'];
        //event handlers
        viewModel.searchRestaurants = searchRestaurants;

        function init() {
            if(rid==undefined) {

                var promise = RestaurantService.findRestaurant(resName);
                promise.then(
                    function (restaurant) {
                        restaurant = restaurant.data.restaurants;
                        if (restaurant != undefined) {
                            viewModel.restaurant = restaurant[0];
                        } else {
                            viewModel.errorMessage = "Error while loading restaurant by ID:" + resId;
                        }
                    }
                );

                var promise = RestaurantService.findRestaurantMenuById(resId);
                promise.then(
                    function (restaurantMenu) {
                        restaurantMenu = restaurantMenu.data;
                        if (restaurantMenu != undefined) {
                            viewModel.restaurantMenu = restaurantMenu;
                        } else {
                            viewModel.errorMessage = "Error while loading restaurant menu";
                        }
                    }
                );
            }
            else{
                viewModel.resId = rid;
                resId = rid;
                var promise = RestaurantService.findRestaurantByIdFromDB(rid);
                promise.then(
                    function (restaurant) {
                        restaurant = restaurant.data;
                        if (restaurant != undefined) {
                            viewModel.restaurant = restaurant;
                            viewModel.restaurantMenu = restaurant.menu;
                            viewModel.userType = restaurant.userType;
                            viewModel.resName = restaurant.name;
                        } else {
                            viewModel.errorMessage = "Error while loading restaurant menu";
                        }
                    }
                );

            }

            var promise = PostService.findPostsByRestaurantId(resId);
            promise.then(
                function (posts) {
                    posts = posts.data;
                    if (posts != undefined) {
                        viewModel.posts = posts;
                    } else {
                        viewModel.errorMessage = "Error while loading Posts";
                    }
                }
            );
        }
        init();


        function searchRestaurants() {
            var resname = $( "#resname").val();
            var radius = $( "#radius").val();
            $location.url("/restaurant/search/"+radius+"/"+resname);
        }
    }

})();