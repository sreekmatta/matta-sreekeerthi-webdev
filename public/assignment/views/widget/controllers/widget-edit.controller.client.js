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
                viewModel.type = widgetIdParts[1];
            }
            else {
                var promise = WidgetService.findWidgetById(widgetId);
                promise.then(function successCallback(response) {
                        var widget = response.data;
                        if (widget.type == "IMAGE" || widget.type == "YOUTUBE") {
                            widget.width = getWidthValue(widget.width);
                        }
                        viewModel.widget = widget;
                        viewModel.editWidgetVar = true;
                    },
                    function errorCallback(response) {
                        viewModel.errorMessage = "Error while loading Widget";
                    });
            }
        }
        init();

        function getWidgetEditURL(type) {
            var url = "views/widget/templates/editors/widget-edit-"+type+".view.client.html";
            return url;
        }

        function getWidthValue(widthInPercent) {
            var widthVals = widthInPercent.split("%");
            var width = widthVals[0];
            return width;
        }

        function editWidget(widgetDetails) {
            var promise =  WidgetService.updateWidget(widgetDetails._id,widgetDetails);
            promise.then(function successCallback(response) {
                    var widgetDetails = response.data;
                    if(widgetDetails!= undefined) {
                        $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");
                    } else {
                        viewModel.errorMessage = "Error while updating widget by ID:" + widgetId;
                    }
                },
                function errorCallback(response) {
                    viewModel.errorMessage = "Error while updating widget by ID:" + widgetId;
                });
        }

        function deleteWidget() {
            var promise =  WidgetService.deleteWidget(widgetId);
            promise.then(function successCallback(response) {
                    var deletedWidgetId = response.data;
                    if(deletedWidgetId!= undefined) {
                        $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");
                    } else {
                        viewModel.errorMessage = "Error while deleting widget by ID:" + widgetId;
                    }
                },
                function errorCallback(response) {
                    viewModel.errorMessage = "Error while deleting widget by ID:" + widgetId;
                });

        }

        function createNewWidget(widgetDetails) {
            widgetDetails.type = viewModel.type;
            var promise =  WidgetService.createWidget(pageId,widgetDetails);
            promise.then(function successCallback(response) {
                    var widgetDetails = response.data;
                    if(widgetDetails!= undefined) {
                        $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");
                    } else {
                        viewModel.errorMessage = "Error while creating widget";
                    }
                },
                function errorCallback(response) {
                    viewModel.errorMessage = "Error while creating widget";
                });
        }

        function uploadWidget(widgetDetails) {
            if(widgetDetails._id== undefined){
                var widgetId = Math.floor(Date.now() / 1000);
            }
            var promise =  WidgetService.uploadWidget(widgetId,widgetDetails);
            promise.then(function successCallback(response) {
                    var widgetDetails = response.data;
                    if(widgetDetails!= undefined) {
                        $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");
                    } else {
                        viewModel.errorMessage = "Error while uploading widget by ID:" + widgetId;
                    }
                },
                function errorCallback(response) {
                    viewModel.errorMessage = "Error while uploading widget by ID:" + widgetId;
                });
        }
    }
})();