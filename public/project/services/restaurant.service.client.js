(function () {
    angular
        .module("HungryOwlAppMaker")
        .factory("RestaurantService", restaurantService);

    function restaurantService($http) {
        var api = {
            restaurantLogout: restaurantLogout,
            loginRestaurant : loginRestaurant,
            restaurantRegister: restaurantRegister,
            findRestaurantByCredentials: findRestaurantByCredentials,
            findRestaurantByIdFromDB:findRestaurantByIdFromDB,
            findRestaurantByNameFromDB:findRestaurantByNameFromDB,
            updateRestaurant: updateRestaurant,
            findRestaurantByUsername: findRestaurantByUsername,
            createRestaurant: createRestaurant,
            deleteRestaurant: deleteRestaurant,
            findRestaurantMenuById:findRestaurantMenuById,
            findRestaurant:findRestaurant,
            findRestaurantByName:findRestaurantByName,
            findRestaurantsNearBy:findRestaurantsNearBy,
            findDeliveringRestaurantsOfCuisine:findDeliveringRestaurantsOfCuisine,
            findAllRestaurantsOfCuisine:findAllRestaurantsOfCuisine,
            findAllRestaurants:findAllRestaurants,
            findAllCuisineTypes:findAllCuisineTypes,
            findRestaurantsByCuisineFromDB:findRestaurantsByCuisineFromDB
        };
        return api;

        function findRestaurantsByCuisineFromDB(cuisineType) {
            return $http.get("/rest/restaurant/cuisine/"+cuisineType);
        }

        function findAllCuisineTypes() {
            return $http.get("/rest/restaurant/allcuisines");
        }

        function loginRestaurant(restaurant) {
            return $http.post("/rest/restaurant/login", restaurant);
        }

        function restaurantLogout(restaurant) {
            return $http.post("/rest/restaurant/logout");
        }

        function restaurantRegister(restaurant) {
            return $http.post("/rest/restaurant/register", restaurant);
        }

        function createRestaurant(restaurant) {
            return $http.post("/rest/restaurant", restaurant);
        }

        function findRestaurantByUsername(username) {
            return $http.get("/rest/restaurant?username="+username);
        }

        function updateRestaurant(rid, restaurant) {
            return $http.put("/rest/restaurant/"+rid, restaurant);
        }

        function findRestaurantByCredentials(username, password) {
            return $http.get("/rest/restaurant?username="+username+"&password="+password);
        }

        function deleteRestaurant(rid) {
            return $http.delete("/rest/restaurant/"+rid);
        }


        function findRestaurantByNameFromDB(resName) {
            return $http.get("/rest/restaurant/name/"+resName);
        }

        function findRestaurant(resName) {
            var url = "https://api.eatstreet.com/publicapi/v1/restaurant/search?latitude=42.343165899999995&longitude=-71.1011797&method=both&pickup-radius=100&" +
                "search="+resName+"&access-token=9519d5bba99b4fc1";
            var results = $http.get(url);
            return results;
        }

        function findRestaurantMenuById(resId) {
            var url = "https://api.eatstreet.com/publicapi/v1/restaurant/"+resId+"/menu?includeCustomizations=false&access-token=9519d5bba99b4fc1";
            var results = $http.get(url);
            return results;
        }

        function findRestaurantByName(lat,lon,resName) {
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

        function findRestaurantByIdFromDB(resId) {
            return $http.get("/rest/restaurant/"+resId);
        }

        function findAllRestaurants() {
            return $http.get("/rest/restaurant/allrestaurants");
        }
    }
})();
