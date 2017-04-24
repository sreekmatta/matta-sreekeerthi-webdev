(function () {
    angular
        .module("HungryOwlAppMaker")
        .controller("AddRestaurantInfoController", AddRestaurantInfoController);

    function AddRestaurantInfoController(RestaurantService,$scope,$location,$rootScope,$routeParams) {
        var viewModel = this;
        viewModel.currentUser = $rootScope.currentUser;
        var rid = viewModel.currentUser._id;
        viewModel.rid = rid;




        var allCusineTypes = [
            {id: 1, label: "American"},
            {id: 2, label: "Indian"},
            {id: 3, label: "Chinese"},
            {id: 4, label: "Thai"},
            {id: 5, label: "Japanese"},
            {id: 6, label: "Italian"},
            {id: 7, label: "Turkish"},
            {id: 8, label: "Asian"},
            {id: 9, label: "Halal"},
            {id: 10, label: "Mediterranean"},
            {id: 11, label: "Middle Eastern"},
            {id: 12, label: "Taiwanese"},
            {id: 13, label: "Korean"},
            {id: 14, label: "Lebanese"},
            {id: 15, label: "Latin American"}
        ];
        viewModel.example8model = [];
        viewModel.example8data = allCusineTypes;
        viewModel.example8settings = {
            scrollableHeight: '150px',
            scrollable: true,
            checkBoxes: true};

        viewModel.updateProfile = updateProfile;

        function init() {

            RestaurantService
                .findRestaurantByIdFromDB(rid)
                .then(
                    function successCallback(response) {
                        var restaurant = response.data;
                        restaurant = restaurant[0];

                        var currResCuisines = restaurant.foodTypes;
                        for(var i=0 ;i< allCusineTypes.length;i++){
                            if(currResCuisines.indexOf(allCusineTypes[i].label)>-1){
                                viewModel.example8model.push(allCusineTypes[i]);
                            }
                        }
                        viewModel.restaurant = restaurant;
                    },
                    function errorCallback(response) {
                        viewModel.errorMessage = "Restaurant does not exist";
                    }
                );
        }
        init();

        function updateProfile(restaurant,checkedCuisines) {
            restaurant.foodTypes = getCheckedCuisinesList(checkedCuisines);
            RestaurantService
                .updateRestaurant(rid,restaurant)
                .then(
                    function successCallback(response) {
                        var restaurant = response.data;
                        viewModel.restaurant = restaurant;
                        viewModel.successMessage = "Restaurant Info updated successfully";
                    },
                    function errorCallback(response) {
                        viewModel.errorMessage = "Restaurant does not exist";
                    }
                );
        }

        function getCheckedCuisinesList(checkedCuisines) {
            var cuisinesList = [];
            for(var i=0 ;i< checkedCuisines.length;i++){
                cuisinesList.push(checkedCuisines[i].label);
            }
            return cuisinesList;
        }

    }
})();