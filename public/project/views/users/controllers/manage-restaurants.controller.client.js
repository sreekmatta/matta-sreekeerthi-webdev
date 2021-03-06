(function () {
    angular
        .module("HungryOwlAppMaker")
        .controller("ManageRestaurantController", ManageRestaurantController);

    function ManageRestaurantController($location,$routeParams,$rootScope,RestaurantService,$route,PostService) {
        var viewModel = this;
        viewModel.currentUser = $rootScope.currentUser;
        var userId = viewModel.currentUser._id;

        var resId = $routeParams['resId'];
        viewModel.userId = userId;
        viewModel.restaurant = null;


        viewModel.searchRestaurants = searchRestaurants;
        viewModel.searchAllRestaurants = searchAllRestaurants;
        viewModel.deleteRestaurant = deleteRestaurant;
        viewModel.updateRestaurant = updateRestaurant;
        viewModel.createRestaurant = createRestaurant;

        function init() {
            RestaurantService
                .findAllRestaurants()
                .then(
                    function (response) {
                        viewModel.allRestaurants = response.data;
                    });

            if(resId){
                RestaurantService
                    .findRestaurantByIdFromDB(resId)
                    .then(
                        function (response) {
                            var resValue = response.data;
                            viewModel.restaurant = resValue[0];
                        });
            }
        }
        init();


        function createRestaurant(restaurant) {

            if (restaurant && restaurant.username && restaurant.password && restaurant.name) {

                RestaurantService.findRestaurantByUsername(restaurant.username)
                    .then(
                        function (response) {
                            var restaurantExists = response.data;
                            if(restaurantExists){
                                viewModel.successMessage="";
                                viewModel.errorMessage = "Restaurant Username already exists";
                            }
                            else{
                                RestaurantService
                                    .createRestaurant(restaurant)
                                    .then(
                                        function (response) {
                                            if(response.status == 200){
                                                viewModel.errorMessage="";
                                                viewModel.successMessage = "Restaurant created successfully";
                                            }
                                            else{
                                                viewModel.successMessage="";
                                                viewModel.errorMessage = "Restaurant not created";
                                            }

                                        });
                            }

                        }
                    );
            }
            else{
                viewModel.successMessage="";
                viewModel.errorMessage = "Restaurant name, Username, Password are mandatory";
            }
        }

        function searchAllRestaurants() {
            // Declare variables
            var input, filter, table, tr, td, i;
            input = document.getElementById("myInput");
            filter = input.value.toUpperCase();
            table = document.getElementById("myTable");
            tr = table.getElementsByTagName("tr");

            // Loop through all table rows, and hide those who don't match the search query
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[0];
                if (td) {
                    if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
        }

        function searchRestaurants() {
            var resname = $( "#resname").val();
            var radius = $( "#radius").val();
            $location.url("/restaurant/search/"+radius+"/"+resname);
        }

        function deleteRestaurant(resId) {
            RestaurantService.deleteRestaurant(resId)
                .then(
                    function(response){
                        if(response.status==200){
                            viewModel.successMessage = "Restaurant with resId: "+resId+" deleted" +
                                "successfully";
                            $route.reload();
                        }
                        else{
                            viewModel.errorMessage = "Error occurred while deleting Restaurant."
                        }
                    }
                );

            PostService.DeleteAllPostsByRestaurant(resId)
                .then(function () {
                    console.log("Delete Success");
                })
        }

        function updateRestaurant(restaurant) {
            if (restaurant && restaurant.username && restaurant.password && restaurant.name) {
                RestaurantService
                    .updateRestaurant(resId,restaurant)
                    .then(
                        function successCallback(response) {
                            viewModel.restaurant = restaurant;
                            viewModel.errorMessage="";
                            viewModel.successMessage = "Restaurant updated successfully";
                        },
                        function errorCallback(response) {
                            viewModel.successMessage="";
                            viewModel.errorMessage = "Error occurred while updating the restaurant";
                        }
                    );
            }
            else{
                viewModel.successMessage="";
                viewModel.errorMessage = "Restaurant Name and Password are mandatory fields";
            }

        }

    }
})();