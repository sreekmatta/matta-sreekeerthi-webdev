module.exports = function (app,pageModel) {

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456","created": "1000093503803", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456","created": "1480091003803", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "created": "1480000503803","description": "Lorem" }
    ];


    function createPage(req,res){
        var websiteId = req.params.websiteId;
        var newPage = req.body;
        pageModel
            .createPage(websiteId,newPage)
            .then(function(page) {
                res.json(page);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findAllPagesForWebsite(req,res) {
        var websiteId = req.params.websiteId;
        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(function (pagesForWebsite) {
                res.json(pagesForWebsite);
            }, function (error) {
                res.sendStatus(500)
            });
    }

    function findPageById(req,res) {
        var pageId = req.params.pageId;

        pageModel
            .findPageById(pageId)
            .then(function (page) {
                res.json(page);
            }, function (error) {
                res.sendStatus(500)
            });
    }

    function updatePage(req,res){
        var pageId = req.params.pageId;
        var page = req.body;

        pageModel
            .updatePage(pageId,page)
            .then(function (page) {
                res.json(page);
            }, function (error) {
                res.sendStatus(500)
            });
    }

    function deletePage(req,res){
        var pageId = req.params.pageId;
        pageModel
            .deletePage(pageId)
            .then(function (page) {
                res.json(200);
            }, function (error) {
                res.sendStatus(500)
            });
    }
};