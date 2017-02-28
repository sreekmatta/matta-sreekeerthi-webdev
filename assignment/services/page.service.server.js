module.exports = function (app) {

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
        var page = req.body;

        var pageId = Math.floor(Date.now() / 1000);
        var createdDate = Date.now();
        var pageDetails =
            {   "_id": pageId,
                "name": page.name,
                "websiteId": websiteId,
                "created": createdDate,
                "description": page.description
            };

        pages.push(pageDetails);
        res.json(pageDetails);
    }

    function findAllPagesForWebsite(req,res) {
        var websiteId = req.params.websiteId;
        var pagesByWebsiteId = [];
        for(p in pages){
            if(pages[p].websiteId == websiteId){
                pagesByWebsiteId.push(pages[p]);
            }
        }
        res.json(pagesByWebsiteId);
    }

    function findPageById(req,res) {
        var pageId = req.params.pageId;

        for(p in pages){
            if(pages[p]._id == pageId){
                res.json(pages[p]);
            }
        }
        res.json(null);
    }

    function updatePage(req,res){
        var pageId = req.params.pageId;
        var page = req.body;

        for(p in pages){
            if(pages[p]._id == pageId){
                pages[p].name = page.name;
                pages[p].description = page.description;
                res.json(page);
            }
        }
        res.json(null);
    }

    function deletePage(req,res){
        var pageId = req.params.pageId;
        for(p in pages){
            if(pages[p]._id == pageId){
                var removedPage = pages.splice(p,1);
                res.json(removedPage);
            }
        }
        res.json(null);
    }
};