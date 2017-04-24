(function () {
    angular
        .module("HungryOwlAppMaker")
        .controller("AdminDashboardController", AdminController);

    function AdminController($location,$routeParams,$rootScope) {
        var viewModel = this;
        viewModel.currentUser = $rootScope.currentUser;
        var userId = viewModel.currentUser._id;
        viewModel.userId = userId;


        viewModel.searchRestaurants = searchRestaurants;


        function searchRestaurants() {
            var resname = $( "#resname").val();
            var radius = $( "#radius").val();
            $location.url("/restaurant/search/"+radius+"/"+resname);
        }



    }
})();