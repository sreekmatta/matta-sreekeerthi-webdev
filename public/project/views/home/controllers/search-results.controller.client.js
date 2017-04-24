(function () {
    angular
        .module("HungryOwlAppMaker")
        .controller("SearchResultsController", SearchResultsController)
        .filter('pagination', function()
        {
            return function(input, start)
            {
                if(input) {
                    start = +start;
                    return input.slice(start);
                }
                else
                    return input;
            };
        });

    function SearchResultsController($location,$routeParams,RestaurantService,$filter,$rootScope) {
        var viewModel = this;
        var restaurants = [];
        var radius = $routeParams['radius'];
        var resname = $routeParams['resname'];
        viewModel.currentUser = $rootScope.currentUser;

        //default values
        var lat = "42.34";
        var lon = "-71.10";
        viewModel.curPage = 0;
        viewModel.pageSize = 10;

        viewModel.loading = true;
        viewModel.numberOfPages = numberOfPages;
        viewModel.searchRestaurantsByFilters = searchRestaurantsByFilters;
        viewModel.searchRestaurants = searchRestaurants;

        function init() {
            getLocation();
            findRestaurantsNearBy();
        }
        init();

        function searchRestaurants() {
            var resname = $( "#resname").val();
            var radius = $( "#radius").val();
            $location.url("/restaurant/search/"+radius+"/"+resname);
        }

        function findRestaurantsNearBy() {

            var promise = RestaurantService.findRestaurantsNearBy(lat,lon,radius,resname);
            promise.then(
                function (restaurants) {
                    restaurants = restaurants.data;
                    if(restaurants!= undefined) {
                        viewModel.restaurants = restaurants.restaurants;
                    } else {
                        viewModel.errorMessage = "Error while loading Restaurants";
                    }
                    RestaurantService
                        .findAllRestaurants()
                        .then(
                            function (response) {
                                var allRes = response.data;
                                viewModel.restaurants = allRes.concat(viewModel.restaurants);
                                viewModel.loading = false;
                            });

                }

            );
        }

        function numberOfPages() {
            if(viewModel.restaurants)
                return Math.ceil(viewModel.restaurants.length / viewModel.pageSize);
            else
                return 0;
        }


        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            }
        }

        function showPosition(position) {
            lat = position.coords.latitude;
            lon =  position.coords.longitude;
        }

        function searchRestaurantsByFilters() {
            var cuisine = $('input[name=cuisine]:checked').val();
            var radius = $('input[name=radius]:checked').val();
            var promise = RestaurantService.findAllRestaurantsOfCuisine(lat,lon,radius,cuisine);
            promise.then(
                function (restaurants) {
                    restaurants = restaurants.data;
                    if(restaurants!= undefined) {
                        viewModel.restaurants = restaurants.restaurants;

                        var promiseDB = RestaurantService.findRestaurantsByCuisineFromDB(cuisine);
                        promiseDB.then(
                            function (response) {
                                var resDB = response.data;
                                if(resDB!= undefined) {
                                    viewModel.restaurants =
                                        viewModel.restaurants.concat(resDB);
                                }
                            }
                        )
                    } else {
                        viewModel.errorMessage = "Error while loading Restaurants";
                    }
                }
            );
        }
    }
})();