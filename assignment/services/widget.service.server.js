module.exports = function (app) {

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/allwidget",findAllWidgetsForPage);
    app.get("/api/page/:pageId/widget", findWidgetsByPageId);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);

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

    // function uploadImage(req, res) {
    //     console.log("Entered upload Image");
    //     var widgetId      = req.body.widgetId;
    //     var width         = req.body.width;
    //     var myFile        = req.file;
    //     var originalname  = myFile.originalname; // file name on user's computer
    //     var filename      = myFile.filename;     // new file name in upload folder
    //     var path          = myFile.path;         // full path of uploaded file
    //     var destination   = myFile.destination;  // folder where file is saved to
    //     var size          = myFile.size;
    //     var mimetype      = myFile.mimetype;
    //
    //     if(widgetId!=undefined){
    //         updateWidget(req,res);
    //     }
    //     else
    //         createWidget(req,res)
    //
    // }


    function uploadImage(req, res) {

        var widget        = req.body;
        var myFile        = req.file;
        var pageId = req.body.pageId;
        widget.pageId = pageId;
        var url = req.protocol + '://' +req.get('host')+"/uploads/"+myFile.filename;
        if(widget.widgetId == "")
        {
            widget.url = url;
            var widgetId = Math.floor(Date.now() / 1000);

            widget._id = widgetId;
            widget.widgetType = "IMAGE";
            console.log("In if",widget);
            widgets.push(widget);
        }
        else
        {
            for (var w in widgets)
            {
                if(widgets[w]._id === widget.widgetId)
                {
                    widgets[w].url = url;
                    widgets[w].width = widget.width;
                }
            }
            console.log("In else",widget);

            widget._id = widget.widgetId;
        }
        res.redirect("/assignment/index.html#!/user/" + req.body.userId + "/website/" + req.body.websiteId + "/page/" + req.body.pageId + "/widget/");
    }



    function createWidget(req,res){
        var pageId = req.params.pageId;
        var widget = req.body;
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
        res.json(widgetDetails);
    }
    function findAllWidgetsForPage(req,res){
        var pageId = req.params.pageId;
        var allWidgets = [];
        for(wi in allWidgetTypes){
            allWidgets.push(allWidgetTypes[wi]);
        }
        res.json(allWidgets);
}

    function findWidgetsByPageId(req,res){
        var pageId = req.params.pageId;
        var widgetsByPage = [];
        for(wi in widgets){
            if(widgets[wi].pageId == pageId){
                widgetsByPage.push(widgets[wi]);
            }
        }
        res.json(widgetsByPage);
    }
    function findWidgetById(req,res){
        var widgetId = req.params.widgetId;
        for(wi in widgets) {
            if (widgets[wi]._id == widgetId) {
                res.json(widgets[wi]);
            }
        }
        res.json(null);
    }
    function updateWidget(req,res){
        var widgetId = req.params.widgetId;
        var widget = req.body;
        for(wi in widgets) {
            if (widgets[wi]._id == widgetId) {
                widgets[wi].name = widget.name;
                widgets[wi].text = widget.text;
                widgets[wi].size = widget.size;
                widgets[wi].width = widget.width + "%";
                widgets[wi].url = widget.url;
                res.json(widgets[wi]);
            }
        }
        res.json(null);
    }

    function deleteWidget(req,res){
        var widgetId = req.params.widgetId;
        for(wi in widgets) {
            if (widgets[wi]._id == widgetId) {
                widgets.splice(wi, 1);
                res.json(widgetId);
            }
        }
        res.json(null);
    }
};