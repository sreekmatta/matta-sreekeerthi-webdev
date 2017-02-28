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


            var promiseCurrentWebsite = WebsiteService.findWebsiteById(websiteId);
            promiseCurrentWebsite.then(function successCallback(response) {
                    var currentWebsite = response.data;
                    if(currentWebsite!= undefined) {
                        viewModel.currentWebsite = currentWebsite; //current website to edit
                    } else {
                        viewModel.errorMessage = "Error while loading website";
                    }

                },
                function errorCallback(response) {
                    viewModel.errorMessage = "Error while loading website";
                });
        }
        init();

        function editWebsite(websiteDetails) {
            var promise = WebsiteService.updateWebsite(websiteId,websiteDetails);
            promise.then(function successCallback(response) {
                    var websiteDetails = response.data;
                    if(websiteDetails!= undefined) {
                        $location.url("/user/"+userId+"/website");
                    } else {
                        viewModel.errorMessage = "Error while updating website by ID:" + websiteId;
                    }
                },
                function errorCallback(response) {
                    viewModel.errorMessage = "Error while updating website by ID:" + websiteId;
                });

        }

        function deleteWebsite() {
            var promise = WebsiteService.deleteWebsite(websiteId);
            promise.then(function successCallback(response) {
                    var deleteWebsiteId = response.data;
                    if(deleteWebsiteId!= undefined) {
                        $location.url("/user/"+userId+"/website");
                    } else {
                        viewModel.errorMessage = "Error while deleting website by ID:" + websiteId;
                    }
                },
                function errorCallback(response) {
                    viewModel.errorMessage = "Error while deleting website by ID:" + websiteId;
                });
        }
    }
})();