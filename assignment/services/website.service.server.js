module.exports = function (app,websiteModel) {

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);
    var websites = [
        { "_id": "123", "name": "Facebook", "created": "1480093503803",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",  "created": "1481293503803",   "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",  "created": "1486793503803",    "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe",  "created": "1486113503803", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",     "created": "1486003503803", "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",      "created": "1486000503803",  "developerId": "234", "description": "Lorem" }
    ];

    function createWebsite(req, res) {
        var userId = req.params.userId;
        var website = req.body;;

        websiteModel
            .createWebsiteForUser(userId, website)
            .then(function (doc){
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500);
            });
    }

    function findAllWebsitesForUser(req,res) {
        var userId = req.params.userId;
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(function(websitesForUser) {
                res.json(websitesForUser);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findWebsiteById(req,res){
        var websiteId = req.params.websiteId;
        websiteModel
            .findWebsiteById(websiteId)
            .then(function(website) {
                res.json(website);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function updateWebsite(req, res){
        var websiteId = req.params.websiteId;
        var website = req.body;
        websiteModel
            .updateWebsite(websiteId,website)
            .then(function(doc) {
                res.json(200);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function deleteWebsite(req, res){
        var websiteId = req.params.websiteId;
        websiteModel
            .deleteWebsite(websiteId)
            .then(function(doc) {
                res.json(200);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }
};