(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController)
        .directive('stringToNumber', function() {
            return {
                require: 'ngModel',
                link: function(scope, element, attrs, ngModel) {
                    ngModel.$parsers.push(function(value) {
                        return '' + value;
                    });
                    ngModel.$formatters.push(function(value) {
                        return parseFloat(value);
                    });
                }
            };
        });

    function WidgetEditController(WidgetService,$sce,$routeParams,$location) {
        var viewModel = this;
        var userId = $routeParams['uid'];
        viewModel.userId = userId;
        var websiteId = $routeParams['wid'];
        viewModel.websiteId = websiteId;
        var pageId = $routeParams['pid'];
        viewModel.pageId = pageId;
        var widgetId = $routeParams['wgid'];
        viewModel.widgetId = widgetId;

        //event handlers
        viewModel.getWidgetEditURL =  getWidgetEditURL;
        viewModel.editWidget = editWidget;
        viewModel.deleteWidget = deleteWidget;
        viewModel.createNewWidget = createNewWidget;

        function init() {
            var widgetIdParts = widgetId.split("-");
            if(widgetIdParts[0]=="create"){
                viewModel.widgetType = widgetIdParts[1];
            }
            else {
                var widget = WidgetService.findWidgetById(widgetId);
                if (widget.widgetType == "IMAGE" || widget.widgetType == "YOUTUBE") {
                    widget.width = getWidthValue(widget.width);
                }
                viewModel.widget = widget;
                viewModel.editWidgetVar = true;
            }
        }
        init();

        function getWidgetEditURL(widgetType) {
            var url = "views/widget/templates/editors/widget-edit-"+widgetType+".view.client.html";
            return url;
        }

        function getWidthValue(widthInPercent) {
            var widthVals = widthInPercent.split("%");
            var width = widthVals[0];
            return width;
        }

        function editWidget(widgetDetails) {
            var widgetDetails = WidgetService.updateWidget(widgetDetails._id,widgetDetails);
            if(widgetDetails!= undefined) {
                viewModel.successMessage = "Widget updated successfully";
            } else {
                viewModel.errorMessage = "Error while updating widget by ID:" + widgetId;
            }
            $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");
        }

        function deleteWidget() {
            var deletedWidgetId = WidgetService.deleteWidget(widgetId);
            if(deletedWidgetId!= undefined) {
                viewModel.successMessage = "Widget deleted successfully";
            } else {
                viewModel.errorMessage = "Error while deleting widget by ID:" + widgetId;
            }
            $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");
        }

        function createNewWidget(widgetDetails) {
            widgetDetails.widgetType = viewModel.widgetType;

            var widgetDetails = WidgetService.createWidget(pageId,widgetDetails);
            if(widgetDetails!= undefined) {
                viewModel.successMessage = "Widget created successfully";
            } else {
                viewModel.errorMessage = "Error while creating widget";
            }
            $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");
        }

    }
})();