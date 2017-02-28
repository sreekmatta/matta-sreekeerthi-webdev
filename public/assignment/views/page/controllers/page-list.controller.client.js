(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController(PageService,$routeParams) {
        var viewModel = this;
        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];

        viewModel.userId = userId;
        viewModel.websiteId = websiteId;

        //event handlers
        //no event handlers here

        function init() {
            var promise = PageService.findPageByWebsiteId(websiteId);
            promise.then(function successCallback(response) {
                    var pages = response.data;
                    if(pages!= undefined) {
                        viewModel.pages = pages;
                    } else {
                        viewModel.errorMessage = "Error while loading pages for website ID:" + websiteId;
                    }
                },
                function errorCallback(response) {
                    viewModel.errorMessage = "Error while loading pages for website ID:" + websiteId;
                });
        }
        init();

    }
})();