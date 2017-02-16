/**
 * Created by sreematta on 2/9/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("WebsiteService",WebsiteService);

    function WebsiteService() {

        var websites = [
            { "_id": "123", "name": "Facebook", "created": "1480093503803",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",  "created": "1481293503803",   "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",  "created": "1486793503803",    "developerId": "456", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe",  "created": "1486113503803", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",     "created": "1486003503803", "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",      "created": "1486000503803",  "developerId": "234", "description": "Lorem" }
        ];

        var apiWebsites = {
            createWebsite : createWebsite,
            findWebsitesByUser : findWebsitesByUser,
            findWebsiteById : findWebsiteById,
            updateWebsite : updateWebsite,
            deleteWebsite : deleteWebsite
        };
        return apiWebsites;

        function createWebsite(userId, website) {
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
        }

        function findWebsitesByUser(userId) {
            var websitesByUserId = [];
            for(w in websites){
                if(websites[w].developerId == userId){
                    websitesByUserId.push(angular.copy(websites[w]));
                }
            }
            return websitesByUserId;
        }

        function findWebsiteById(websiteId){

            for(w in websites){
                if(websites[w]._id == websiteId){
                    return angular.copy(websites[w]);
                }
            }
            return null;
        }

        function updateWebsite(websiteId, website){
            for(w in websites){
                if(websites[w]._id == websiteId){
                    websites[w].name = website.name;
                    websites[w].description = website.description;
                    return website;
                }
            }
            return null;
        }

        function deleteWebsite(websiteId){
            for(w in websites){
                if(websites[w]._id == websiteId){
                    var removedWebsite = websites.splice(w,1);
                    return removedWebsite;
                }
            }
            return null;
        }

    }

})();