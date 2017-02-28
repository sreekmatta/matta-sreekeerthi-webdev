module.exports = function (app) {

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);
    console.log("Websites enter");
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

        var websiteId = Math.floor(Date.now() / 1000);
        var createdDate = Date.now();
        var websiteDetails =
            {   "_id":websiteId,
                "name":website.name,
                "created" : createdDate,
                "developerId" :userId,
                "description":website.description
            };

        websites.push(websiteDetails);
        res.json(websiteDetails);
    }

    function findAllWebsitesForUser(req,res) {
        console.log("Websites enter 1");
        var userId = req.params.userId;
        var websitesByUserId = [];
        for(w in websites){
            if(websites[w].developerId == userId){
                websitesByUserId.push(websites[w]);
            }
        }
        console.log("Websites enter 2");
        res.json(websitesByUserId);
    }

    function findWebsiteById(req,res){
        var websiteId = req.params.websiteId;
        for(w in websites){
            if(websites[w]._id == websiteId){
                res.json(websites[w]);
            }
        }
        res.json(null);
    }

    function updateWebsite(req, res){
        var websiteId = req.params.websiteId;
        var website = req.body;
        for(w in websites){
            if(websites[w]._id == websiteId){
                websites[w].name = website.name;
                websites[w].description = website.description;
                res.json(website);
            }
        }
        res.json(null);
    }

    function deleteWebsite(req, res){
        var websiteId = req.params.websiteId;
        for(w in websites){
            if(websites[w]._id == websiteId){
                var removedWebsite = websites.splice(w,1);
                res.json(removedWebsite);
            }
        }
        res.json(null);
    }
};