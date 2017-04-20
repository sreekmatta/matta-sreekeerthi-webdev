(function () {
    angular
        .module("HungryOwlAppMaker")
        .controller("RestaurantDetailsController", RestaurantDetailsController)
        .filter('myFormat', function() {
            return function(x) {
                x = x[0];
                return x;
            };
        });

    function RestaurantDetailsController($route,PostService,UserService,RestaurantService,$sce,$location,$rootScope,$routeParams) {
        var viewModel = this;
        var resId = $routeParams['resid'];
        var resName = $routeParams['resName'];
        var imageUploaded = $routeParams['imageUploaded'];
        viewModel.resId = resId;
        viewModel.resName = resName;

        viewModel.currentUser = $rootScope.currentUser;


        var rid = $routeParams['rid'];
        //event handlers
        viewModel.searchRestaurants = searchRestaurants;
        viewModel.getHTMLContent = getHTMLContent;

        function init() {
            if(imageUploaded){
                RestaurantService
                    .findRestaurantByIdFromDB(restaurant.username,restaurant.password)
                    .then(
                        function successCallback(response) {
                            var restaurant = response.data;
                            if(restaurant){
                                $rootScope.currentUser = restaurant;
                            }
                            else{
                                $location.url("/");

                            }
                        },
                        function errorCallback(response) {
                            $location.url("/");
                        }
                    );
            }
            else
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
                    function successCallback(restaurant) {
                        restaurant = restaurant.data;
                        if (restaurant != undefined) {
                            viewModel.restaurant = restaurant;
                            viewModel.userType = restaurant.userType;
                            viewModel.resName = restaurant.name;
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

            var lat = $routeParams['lat'];
            var lon = $routeParams['lon'];

            if(lat!=undefined && lon!=undefined
                && viewModel.restaurant == undefined
                &&!imageUploaded){
                var promise = RestaurantService.findRestaurantByName(lat,lon,rid)
                promise.then(
                    function (restaurant) {
                        if (restaurant.data != undefined) {
                            var restauarantArr = restaurant.data;
                            restauarantArr= restauarantArr.restaurants
                            viewModel.restaurant = restauarantArr[0];
                            resId = viewModel.restaurant.apiKey;
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
                        } else {
                            viewModel.errorMessage = "Error while loading Restaurant";
                        }
                    }
                );
            }
        }
        init();


        function searchRestaurants() {
            var resname = $( "#resname").val();
            var radius = $( "#radius").val();
            $location.url("/restaurant/search/"+radius+"/"+resname);
        }

        function getHTMLContent(html) {
            return $sce.trustAsHtml(html);
        }
    }
})();