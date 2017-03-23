module.exports = function (app,widgetModel) {

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/allwidget",findAllWidgetsForPage);
    app.get("/api/page/:pageId/widget", findWidgetsByPageId);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.put("/api/page/:pageId/widget", updateWidgetOrder);
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

    function uploadImage(req, res) {
        var widget = req.body;
        var myFile = req.file;
        var pageId = req.body.pageId;
        widget.pageId = pageId;
        if(widget.widgetId == "" && myFile!=null)
        {
            var url = req.protocol + '://' +req.get('host')+"/uploads/"+myFile.filename;
            widget.url = url;
            widget.type = "IMAGE";
            widgetModel
                .createWidget(pageId,widget)
                .then(function (widget) {
                    res.redirect("/assignment/index.html#!/user/" + req.body.userId + "/website/" + req.body.websiteId + "/page/" + req.body.pageId + "/widget/");
                }, function (error) {
                    res.sendStatus(500);
                });
        }
        else if(widget.widgetId != "" && myFile!=null)
        {
            var url = req.protocol + '://' +req.get('host')+"/uploads/"+myFile.filename;
            widget.url = url;
            widgetModel
                .updateWidget(widget.widgetId,widget)
                .then(function (widget) {
                    res.redirect("/assignment/index.html#!/user/" + req.body.userId + "/website/" + req.body.websiteId + "/page/" + req.body.pageId + "/widget/");
                }, function (error) {
                    res.sendStatus(500);
                });
        }
        else if(myFile == null){
            if(widget.widgetId == ""){
                widget.type = "IMAGE";
                widgetModel
                    .createWidget(pageId,widget)
                    .then(function (widget) {
                        res.redirect("/assignment/index.html#!/user/" + req.body.userId + "/website/" + req.body.websiteId + "/page/" + req.body.pageId + "/widget/");
                    }, function (error) {
                        res.sendStatus(500);
                    });
            }
            else{
                widgetModel
                    .updateWidget(widget.widgetId,widget)
                    .then(function (widget) {
                        res.redirect("/assignment/index.html#!/user/" + req.body.userId + "/website/" + req.body.websiteId + "/page/" + req.body.pageId + "/widget/");
                    }, function (error) {
                        res.sendStatus(500);
                    });
            }

        }
    }


    function createWidget(req,res){

        var pageId = req.params.pageId;
        var widget = req.body;
        console.log(widget);
        widgetModel
            .createWidget(pageId,widget)
            .then(function (widget) {
                res.json(widget);
            }, function (error) {
                res.sendStatus(500)
            });
    }

    function findAllWidgetsForPage(req,res){
        res.json(widgetModel.findAllWidgetTypes());
    }

    function findWidgetsByPageId(req,res){
        var pageId = req.params.pageId;
        widgetModel
            .findWidgetsByPageId(pageId)
            .then(function (widgets) {
                res.json(widgets);
            }, function (error) {
                res.sendStatus(500)
            });
    }
    function findWidgetById(req,res){
        var widgetId = req.params.widgetId;
        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                res.json(widget);
            }, function (error) {
                res.sendStatus(500)
            });
    }
    function updateWidget(req,res){
        var widgetId = req.params.widgetId;
        var widget = req.body;
        widgetModel
            .updateWidget(widgetId,widget)
            .then(function (widget) {
                res.json(widget);
            }, function (error) {
                res.sendStatus(500)
            });
    }

    function deleteWidget(req,res){
        var widgetId = req.params.widgetId;

        widgetModel
            .deleteWidget(widgetId)
            .then(function (doc) {
                res.json(200);
            }, function (error) {
                res.sendStatus(500)
            });
    }
    function updateWidgetOrder(req, res) {
        var initial = req.query.initial;
        var final = req.query.final;
        var pageId = req.params.pageId;

        widgetModel
            .updateWidgetOrder(pageId, initial, final)
            .then(function (doc) {
                res.json(200);
            }, function (error) {
                res.sendStatus(500)
            });
    }
};