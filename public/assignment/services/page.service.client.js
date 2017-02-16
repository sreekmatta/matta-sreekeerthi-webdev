/**
 * Created by sreematta on 2/9/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("PageService",PageService);

    function PageService() {

        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456","created": "1000093503803", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456","created": "1480091003803", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "created": "1480000503803","description": "Lorem" }
        ];

        var apiPages = {
            createPage : createPage,
            findPageByWebsiteId : findPageByWebsiteId,
            findPageById : findPageById,
            updatePage : updatePage,
            deletePage : deletePage
        };
        return apiPages;

        function createPage(websiteId, page){
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
        }

        function findPageByWebsiteId(websiteId) {
            var pagesByWebsiteId = [];
            for(p in pages){
                if(pages[p].websiteId == websiteId){
                    pagesByWebsiteId.push(angular.copy(pages[p]));
                }
            }
            return pagesByWebsiteId;
        }

        function findPageById(pageId) {

            for(p in pages){
                if(pages[p]._id == pageId){
                    return angular.copy(pages[p]);
                }
            }
            return null;
        }

        function updatePage(pageId, page){
            for(p in pages){
                if(pages[p]._id == pageId){
                    pages[p].name = page.name;
                    pages[p].description = page.description;
                    return page;
                }
            }
            return null;

        }

        function deletePage(pageId){
            for(p in pages){
                if(pages[p]._id == pageId){
                    var removedPage = pages.splice(p,1);
                    return removedPage;
                }
            }
            return null;
        }
    }
})();