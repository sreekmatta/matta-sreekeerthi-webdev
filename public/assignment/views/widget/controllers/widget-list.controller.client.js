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
            var promise =  WidgetService.findWidgetsByPageId(pageId);
            promise.then(function successCallback(response) {
                    var widgets = response.data;
                    if(widgets!= undefined) {
                        viewModel.widgets = widgets;
                    } else {
                        viewModel.errorMessage = "Error while loading Widgets for Page ID:" + pageId;
                    }
                },
                function errorCallback(response) {
                    viewModel.errorMessage = "Error while loading Widgets for Page ID:" + pageId;
                });
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

        function getWidgetURL(type) {
            var url = 'views/widget/templates/widget-'+type+'.view.client.html';
            return url;
        }
    }
})();