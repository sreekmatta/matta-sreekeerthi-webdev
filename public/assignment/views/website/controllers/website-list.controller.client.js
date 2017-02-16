(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController(WebsiteService,$routeParams) {
        var viewModel = this;
        var userId = $routeParams['uid'];
        viewModel.userId = userId;

        //event handlers
        //no event handlers

        function init() {
            var websites = WebsiteService.findWebsitesByUser(userId);

            if(websites!= undefined) {
                viewModel.websites = websites;
            } else {
                viewModel.errorMessage = "Error while loading websites for user ID:" + userId;
            }
        }
        init();

    }
})();