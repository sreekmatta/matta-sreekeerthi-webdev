(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController(WidgetService,$sce,$routeParams) {
        var viewModel = this;
        var userId = $routeParams['uid'];
        viewModel.userId = userId;
        var websiteId = $routeParams['wid'];
        viewModel.websiteId = websiteId;
        var pageId = $routeParams['pid'];
        viewModel.pageId = pageId;

        //event handlers
        viewModel.getVideoURL =  getVideoURL;
        viewModel.getHTML = getHTML;
        viewModel.getWidgetURL = getWidgetURL;

        function init() {
            var widgets = WidgetService.findWidgetsByPageId(pageId);
            viewModel.widgets = widgets;
        }
        init();

        function getVideoURL(url) {
            var urlContents = url.split("/");
            var urlId = urlContents[urlContents.length-1];

            var url = "https://www.youtube.com/embed/"+urlId;
            return $sce.trustAsResourceUrl(url);
        }

        function getHTML(html) {
            return $sce.trustAsHtml(html);
        }

        function getWidgetURL(widgetType) {
            var url = 'views/widget/templates/widget-'+widgetType+'.view.client.html';
            return url;
        }
    }
})();