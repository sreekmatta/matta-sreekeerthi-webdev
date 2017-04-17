(function () {
    angular
        .module("HungryOwlAppMaker")
        .controller("HomeController", HomeController);

    function HomeController($location,RestaurantService,$rootScope) {
        var viewModel = this;
        viewModel.currentUser = $rootScope.currentUser;

        viewModel.searchRestaurants = searchRestaurants;

        function searchRestaurants() {
            var resname = $( "#resname").val();
            var radius = $( "#radius").val();
            $location.url("/restaurant/search/"+radius+"/"+resname);
        }
    }
})();