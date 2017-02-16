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
            var websites = WebsiteService.findWebsitesByUser(userId);

            if(websites!= undefined) {
                viewModel.websites = websites;
            } else {
                viewModel.errorMessage = "Error while loading websites for user ID:" + userId;
            }
        }
        init();

        function newWebsite(newWebsiteDetails) {
            var created = WebsiteService.createWebsite(userId, newWebsiteDetails);
            $location.url("/user/"+userId+"/website");
        }

    }
})();