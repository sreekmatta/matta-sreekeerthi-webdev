(function () {
    angular
        .module("HungryOwlAppMaker")
        .controller("HomeController", HomeController);

    function HomeController($location,RestaurantService) {
        var viewModel = this;

        viewModel.searchRestaurants = searchRestaurants;

        function searchRestaurants() {
            var resname = $( "#resname").val();
            var radius = $( "#radius").val();
            $location.url("/restaurant/search/"+radius+"/"+resname);
        }



    }
})();