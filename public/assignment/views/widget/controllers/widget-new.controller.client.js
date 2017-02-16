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
            var allWidgetTypes = WidgetService.findAllWidgets(pageId);
            viewModel.allWidgetTypes = allWidgetTypes;
        }
        init();

    }
})();