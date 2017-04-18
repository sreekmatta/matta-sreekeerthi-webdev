(function () {
    angular
        .module("HungryOwlAppMaker")
        .controller("FindFriendsController", FindFriendsController);

    function FindFriendsController(UserService,$location,$rootScope,$route,$routeParams) {
        var viewModel = this;
        viewModel.currentUser = $rootScope.currentUser;
        var friendUsername = $routeParams['frienduname'];
        viewModel.friendUsername = friendUsername;

        //event handlers


        findFriendByUsername(viewModel.friendUsername);
    }
})();