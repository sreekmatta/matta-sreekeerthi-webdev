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
        viewModel.resId = resId;
        viewModel.resName = resName;

        viewModel.currentUser = $rootScope.currentUser;

        if(!resId){
            if(viewModel.currentUser && viewModel.currentUser!='0' &&
            viewModel.currentUser.userType=='RESTAURANT')
            {
                resId =     viewModel.currentUser._id;
            }
            viewModel.resId = resId;
        }


        var apiResId = $routeParams['apiResId'];
        var lat = $routeParams['lat'];
        var lon = $routeParams['lon'];

        //event handlers
        viewModel.searchRestaurants = searchRestaurants;
        viewModel.getHTMLContent = getHTMLContent;

        function init() {
            if(resId && resName) {

                var promise = RestaurantService.findRestaurant(resName);
                promise.then(
                    function (restaurant) {
                        restaurant = restaurant.data.restaurants;
                        if (restaurant != undefined) {
                            viewModel.restaurant = restaurant[0];

                            var promiseMenu = RestaurantService.findRestaurantMenuById(resId);
                            promiseMenu.then(
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
                            viewModel.errorMessage = "Error while loading restaurant by ID:" + resId;
                        }
                    }
                );


            }
            else if(resId && !resName){
                var promise = RestaurantService.findRestaurantByIdFromDB(resId);
                promise.then(
                    function successCallback(restaurant) {
                        restaurant = restaurant.data;
                        restaurant = restaurant[0];
                        if (restaurant != undefined) {
                            viewModel.restaurant = restaurant;
                            viewModel.userType = restaurant.userType;
                            viewModel.resName = restaurant.name;
                        }
                    }
                );

            }

            if(resId){
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


            if(lat!=undefined && lon!=undefined
                && apiResId != undefined){
                var promise = RestaurantService.findRestaurantByName(lat,lon,apiResId);
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