(function () {
    angular
        .module("HungryOwlAppMaker")
        .factory("RestaurantService", restaurantService);

    function restaurantService($http) {
        var api = {
            findRestaurantById:findRestaurantById,
            findRestaurantByName:findRestaurantByName,
            findRestaurantsNearBy:findRestaurantsNearBy,
            findDeliveringRestaurantsOfCuisine:findDeliveringRestaurantsOfCuisine,
            findAllRestaurantsOfCuisine:findAllRestaurantsOfCuisine
        };
        return api;

        function findRestaurantById(resId) {
            var url = "https://api.eatstreet.com/publicapi/v1/restaurant/"+resId+"/menu?includeCustomizations=false&access-token=9519d5bba99b4fc1";
            var results = $http.get(url);
            return results;
        }

        function findRestaurantByName(lat,lon,resName) {
            var lat = document.getElementById("lat").innerHTML;
            var lon = document.getElementById("lon").innerHTML;
            var url = "https://api.eatstreet.com/publicapi/v1/restaurant/search?latitude="+lat+"&longitude="+lon+"&method=both&search="+resName+"&access-token=9519d5bba99b4fc1";
            var results = $http.get(url);
            return results;
        }

        function findRestaurantsNearBy(lat,lon,radius,resName) {
            if(resName=="0") {
                var url = "https://api.eatstreet.com/publicapi/v1/restaurant/search?latitude=" + lat + "&longitude=" + lon + "&method=both&pickup-radius=" + radius + "&access-token=9519d5bba99b4fc1";
                var results = $http.get(url);
                return results;
            }
            else{
                var url = "https://api.eatstreet.com/publicapi/v1/restaurant/search?latitude=" + lat + "&longitude=" + lon + "&method=both&pickup-radius=" + radius + "&search="+resName+"&access-token=9519d5bba99b4fc1";
                var results = $http.get(url);
                return results;
            }
        }

        function findDeliveringRestaurantsOfCuisine(lat,lon,radius,cuisine) {
            if(cuisine!=undefined)
                var url = "https://api.eatstreet.com/publicapi/v1/restaurant/search?latitude=" + lat + "&longitude=" + lon + "&method=delivery&pickup-radius=" + radius + "&search="+cuisine+"&access-token=9519d5bba99b4fc1";
            else
                var url = "https://api.eatstreet.com/publicapi/v1/restaurant/search?latitude=" + lat + "&longitude=" + lon + "&method=delivery&pickup-radius=" + radius + "&access-token=9519d5bba99b4fc1";
            var results = $http.get(url);
            return results;
        }
        function findAllRestaurantsOfCuisine(lat,lon,radius,cuisine) {
            if(cuisine!=undefined)
                var url = "https://api.eatstreet.com/publicapi/v1/restaurant/search?latitude=" + lat + "&longitude=" + lon + "&method=both&pickup-radius=" + radius + "&search="+cuisine+"&access-token=9519d5bba99b4fc1";
            else
                var url = "https://api.eatstreet.com/publicapi/v1/restaurant/search?latitude=" + lat + "&longitude=" + lon + "&method=both&pickup-radius=" + radius + "&access-token=9519d5bba99b4fc1";

            var results = $http.get(url);
            return results;
        }

    }
})();
