(function () {
    angular
        .module("HungryOwlAppMaker")
        .controller("SearchResultsController", SearchResultsController)
        .filter('pagination', function()
        {
            return function(input, start)
            {
                start = +start;
                return input.slice(start);
            };
        });

    function SearchResultsController($location,$routeParams,RestaurantService,$filter,$rootScope) {
        var viewModel = this;
        var restaurants = [];
        var radius = $routeParams['radius'];
        var resname = $routeParams['resname'];
        viewModel.currentUser = $rootScope.currentUser;

        //default values
        var lat = "42.343165899999995"
        var lon ="-71.1011797";
        viewModel.curPage = 0;
        viewModel.pageSize = 10;


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
                }

            );

            var allRes = [];
            RestaurantService
                .findAllRestaurants()
                .then(
                    function (response) {
                        allRes = response.data;
                        viewModel.restaurants = allRes.concat(viewModel.restaurants);
                    });

        }
        viewModel.numberOfPages = function() {
            return Math.ceil(viewModel.restaurants.length / viewModel.pageSize);
        };


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
            var delivery = document.getElementById('delivery');
            if (delivery.checked) {
                var promise = RestaurantService.findDeliveringRestaurantsOfCuisine(lat,lon,radius,cuisine);
                promise.then(
                    function (restaurants) {
                        restaurants = restaurants.data;
                        if(restaurants!= undefined) {
                            viewModel.restaurants = restaurants.restaurants;
                        } else {
                            viewModel.errorMessage = "Error while loading Restaurants";
                        }
                    }
                );
            }
            else{
                var promise = RestaurantService.findAllRestaurantsOfCuisine(lat,lon,radius,cuisine);
                promise.then(
                    function (restaurants) {
                        restaurants = restaurants.data;
                        if(restaurants!= undefined) {
                            viewModel.restaurants = restaurants.restaurants;
                        } else {
                            viewModel.errorMessage = "Error while loading Restaurants";
                        }
                    }
                );
            }

            var allRes = [];
            RestaurantService
                .findAllRestaurants()
                .then(
                    function (response) {
                        allRes = response.data;
                        viewModel.restaurants = allRes.concat(viewModel.restaurants);
                    });
        }
    }
})();