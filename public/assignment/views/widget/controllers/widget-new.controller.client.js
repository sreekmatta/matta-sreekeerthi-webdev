(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController(WidgetService,$sce,$routeParams) {
        var viewModel = this;
        var userId = $routeParams['uid'];
        viewModel.userId = userId;
        var websiteId = $routeParams['wid'];
        viewModel.websiteId = websiteId;
        var pageId = $routeParams['pid'];
        viewModel.pageId = pageId;

        //event handlers
        //no event handlers

        function init() {
            var promise =  WidgetService.findAllWidgets(pageId);
            promise.then(function successCallback(response) {
                    var allWidgetTypes = response.data;
                    if(allWidgetTypes!= undefined) {
                        viewModel.allWidgetTypes = allWidgetTypes;
                    } else {
                        viewModel.errorMessage = "Error while loading Widget Types";
                    }
                },
                function errorCallback(response) {
                    viewModel.errorMessage = "Error while loading Widget Types";
                });

        }
        init();

    }
})();