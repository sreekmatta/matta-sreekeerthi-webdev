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
            var pages =  PageService.findPageByWebsiteId(websiteId);
            viewModel.pages = pages;
        }
        init();


        function createPage(newPageDetails) {
            var created = PageService.createPage(websiteId,newPageDetails);
            $location.url("/user/"+userId+"/website/"+websiteId+"/page");

        }

    }
})();