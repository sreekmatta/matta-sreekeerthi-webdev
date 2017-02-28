(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController(WebsiteService,$routeParams,$location) {
        var viewModel = this;
        var userId = $routeParams['uid'];
        viewModel.userId = userId;

        //event handlers
        viewModel.newWebsite = newWebsite;

        function init() {
            var promise = WebsiteService.findWebsitesByUser(userId);
            promise.then(function successCallback(response) {
                    var websites = response.data;
                    if(websites!= undefined) {
                        viewModel.websites = websites;
                    } else {
                        viewModel.errorMessage = "Error while loading websites for user ID:" + userId;
                    }

                },
                function errorCallback(response) {
                    viewModel.errorMessage = "Error while loading websites for user ID:" + userId;
                });
        }
        init();

        function newWebsite(newWebsiteDetails) {
            var promise = WebsiteService.createWebsite(userId, newWebsiteDetails);
            promise.then(function successCallback(response) {
                    user = response.data;
                    if(user) {
                        $location.url("/user/"+userId+"/website");
                    } else {
                        viewModel.errorMessage = "Website not created";
                    }
                },
                function errorCallback(response) {
                    viewModel.errorMessage = "Website not created";
                });
        }

    }
})();