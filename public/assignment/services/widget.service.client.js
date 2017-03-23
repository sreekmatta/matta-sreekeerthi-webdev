(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService",WidgetService);

    function WidgetService($http){

        var apiWidgets = {
            createWidget : createWidget,
            findAllWidgets : findAllWidgets,
            findWidgetsByPageId : findWidgetsByPageId,
            findWidgetById : findWidgetById,
            updateWidget : updateWidget,
            deleteWidget : deleteWidget,
            sort: sort
        };

        return apiWidgets;

        function createWidget(pageId, widget){
            return $http.post("/api/page/"+pageId+"/widget",widget);
        }
        function findAllWidgets(pageId){
            return $http.get("/api/page/"+pageId+"/allwidget");
        }

        function findWidgetsByPageId(pageId){
            return $http.get("/api/page/"+pageId+"/widget");
        }
        function findWidgetById(widgetId){
            return $http.get("/api/widget/"+widgetId);
        }
        function updateWidget(widgetId, widget){
            return $http.put("/api/widget/"+widgetId,widget);
        }

        function deleteWidget(widgetId){
            return $http.delete("/api/widget/"+widgetId);
        }

        function sort(pageId,start,end){
            return $http.put("/api/page/"+pageId+"/widget?initial="+start+"&final="+end);
        }
    }

})();