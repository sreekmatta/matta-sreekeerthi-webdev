(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController(PageService,$routeParams,$location) {
        var viewModel = this;

        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];

        viewModel.userId = userId;
        viewModel.websiteId = websiteId;

        //Event Handlers
        viewModel.createPage = createPage;


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


        function createPage(newPageDetails) {
            var promise = PageService.createPage(websiteId,newPageDetails);
            promise.then(function successCallback(response) {
                    var created = response.data;
                    if(created!= undefined) {
                        $location.url("/user/"+userId+"/website/"+websiteId+"/page");

                    } else {
                        viewModel.errorMessage = "Error while creating the page for the website with ID:" + websiteId;
                    }
                },
                function errorCallback(response) {
                    viewModel.errorMessage = "Error while creating the page for the website with ID:" + websiteId;
                });
        }

    }
})();