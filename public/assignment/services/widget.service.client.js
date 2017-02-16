(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService",WidgetService);

    function WidgetService(){

        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO","name":"heading text"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum","name":"sub text 1"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "text": "random image",
                "url": "http://lorempixel.com/400/200/","name":"image1"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum HTML content</p>" ,"name":"html1"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum","name":"sub text 2"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" ,"name":"video 1"},
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum HTML content</p>" ,"name":"html2"}
        ];

        var allWidgetTypes = ["HEADER","IMAGE","HTML","YOUTUBE"];
        // added to dynamically load
        // views for different widget
        // if we use widgets above we will not be able to retrive
        // all the widgetTypes if some widget type is deleted in
        // any case.

        var apiWidgets = {
            createWidget : createWidget,
            findAllWidgets : findAllWidgets,
            findWidgetsByPageId : findWidgetsByPageId,
            findWidgetById : findWidgetById,
            updateWidget : updateWidget,
            deleteWidget : deleteWidget
        };

        return apiWidgets;

        function createWidget(pageId, widget){
            var widgetId = Math.floor(Date.now() / 1000);
            var widgetDetails =
                {   "_id":widgetId,
                    "widgetType":widget.widgetType,
                    "pageId": pageId,
                    "width" :widget.width,
                    "size" : widget.size,
                    "url":widget.url,
                    "text":widget.text,
                    "name":widget.name
                };

            widgets.push(widgetDetails);


            return widgetDetails;

        }
        function findAllWidgets(pageId){
            var allWidgets = [];
            for(wi in allWidgetTypes){
                allWidgets.push(allWidgetTypes[wi]);
            }

            return allWidgets;
        }

        function findWidgetsByPageId(pageId){
            var widgetsByPage = [];
            for(wi in widgets){
                if(widgets[wi].pageId == pageId){
                    widgetsByPage.push(angular.copy(widgets[wi]));
                }
            }
            return widgetsByPage;
        }
        function findWidgetById(widgetId){
            for(wi in widgets) {
                if (widgets[wi]._id == widgetId) {
                    return angular.copy(widgets[wi]);
                }
            }
            return null;
        }
        function updateWidget(widgetId, widget){
            for(wi in widgets) {
                if (widgets[wi]._id == widgetId) {
                    widgets[wi].name = widget.name;
                    widgets[wi].text = widget.text;
                    widgets[wi].size = widget.size;
                    widgets[wi].width = widget.width + "%";
                    widgets[wi].url = widget.url;
                    return widgets[wi];
                }
            }
            return null;
        }

        function deleteWidget(widgetId){
            for(wi in widgets) {
                if (widgets[wi]._id == widgetId) {
                    widgets.splice(wi, 1);
                    return widgetId;
                }
            }
            return null;
        }

    }

})();