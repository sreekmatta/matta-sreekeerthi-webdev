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

    }
})();