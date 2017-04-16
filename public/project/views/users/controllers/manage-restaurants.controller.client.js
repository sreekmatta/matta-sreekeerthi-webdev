(function () {
    angular
        .module("HungryOwlAppMaker")
        .controller("ManageRestaurantController", ManageRestaurantController);

    function ManageRestaurantController($location,$routeParams,$rootScope) {
        var viewModel = this;
        var userId = $routeParams['uid'];
        viewModel.userId = userId;
        viewModel.currentUser = $rootScope.currentUser;
        viewModel.searchRestaurants = searchRestaurants;


        function searchRestaurants() {
            var resname = $( "#resname").val();
            var radius = $( "#radius").val();
            $location.url("/restaurant/search/"+radius+"/"+resname);
        }



    }
})();