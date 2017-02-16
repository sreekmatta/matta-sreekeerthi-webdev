(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController(WebsiteService,$routeParams,$location) {
        var viewModel = this;
        var userId = $routeParams['uid'];
        viewModel.userId = userId;
        var websiteId = $routeParams['wid'];
        viewModel.websiteId = websiteId;

        //event handlers
        viewModel.editWebsite = editWebsite;
        viewModel.deleteWebsite = deleteWebsite;

        function init() {
            var websites = WebsiteService.findWebsitesByUser(userId);
            var currentWebsite = WebsiteService.findWebsiteById(websiteId);


            viewModel.websites = websites; //array of websites
            viewModel.currentWebsite = currentWebsite; //current website to edit
        }
        init();

        function editWebsite(websiteDetails) {
            var websiteDetails = WebsiteService.updateWebsite(websiteId,websiteDetails);
            if(websiteDetails!= undefined) {
                viewModel.successMessage = "Website updated successfully";
            } else {
                viewModel.errorMessage = "Error while updating website by ID:" + websiteId;
            }
            $location.url("/user/"+userId+"/website");
        }

        function deleteWebsite() {
            var deleteWebsiteId = WebsiteService.deleteWebsite(websiteId);
            if(deleteWebsiteId!= undefined) {
                viewModel.successMessage = "Website deleted successfully";
            } else {
                viewModel.errorMessage = "Error while deleting website by ID:" + websiteId;
            }
            $location.url("/user/"+userId+"/website");
        }

    }
})();