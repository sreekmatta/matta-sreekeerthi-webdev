(function () {
    angular
        .module("HungryOwlAppMaker")
        .controller("ManageUserController", ManageUserController);

    function ManageUserController($location,$routeParams,$rootScope,UserService) {
        var viewModel = this;
        var userId = $routeParams['uid'];
        viewModel.userId = userId;
        viewModel.currentUser = $rootScope.currentUser;

        viewModel.searchRestaurants = searchRestaurants;
        viewModel.searchUsers = searchUsers;

        function init() {
            UserService
                .findAllUsers()
                .then(
                    function (response) {
                        viewModel.allUsers = response.data;
                    });
        }
        init();

        function searchRestaurants() {
            var resname = $( "#resname").val();
            var radius = $( "#radius").val();
            $location.url("/restaurant/search/"+radius+"/"+resname);
        }

        function searchUsers() {
            var input, filter, table, tr, td, i;
            input = document.getElementById("myInput");
            filter = input.value.toUpperCase();
            table = document.getElementById("myTable");
            tr = table.getElementsByTagName("tr");
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

    }
})();