(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController(PageService,$routeParams,$location) {

        //Route Params
        var viewModel = this;
        var userId = $routeParams['uid'];
        viewModel.userId = userId;
        var websiteId = $routeParams['wid'];
        viewModel.websiteId = websiteId;
        var pageId = $routeParams['pid'];
        viewModel.pageId = pageId;

        //Event Handlers
        viewModel.editPage = editPage;
        viewModel.deletePage = deletePage;


        function init() {
            var pages =  PageService.findPageByWebsiteId(websiteId);
            viewModel.pages = pages;

            var currentPage = PageService.findPageById(pageId);
            viewModel.currentPage = currentPage;
        }
        init();


        function editPage(pageDetails) {
            var pageDetails = PageService.updatePage(pageId,pageDetails);

            if(pageDetails!= undefined) {
                viewModel.successMessage = "Page updated successfully";
            } else {
                viewModel.errorMessage = "Error while updating page by ID:" + pageId;
            }
            $location.url("/user/"+userId+"/website/"+websiteId+"/page");
        }

        function deletePage() {
            var deletedPageId = PageService.deletePage(pageId);
            if(deletedPageId!= undefined) {
                viewModel.successMessage = "Website deleted successfully";
            } else {
                viewModel.errorMessage = "Error while deleting website by ID:" + websiteId;
            }
            $location.url("/user/"+userId+"/website/"+websiteId+"/page");
        }

    }
})();