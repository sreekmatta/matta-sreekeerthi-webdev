(function () {
    angular
        .module("WebAppMaker")
        .service("WebsiteService",WebsiteService);

    function WebsiteService($http) {

        var apiWebsites = {
            createWebsite : createWebsite,
            findWebsitesByUser : findWebsitesByUser,
            findWebsiteById : findWebsiteById,
            updateWebsite : updateWebsite,
            deleteWebsite : deleteWebsite
        };
        return apiWebsites;

        function createWebsite(userId, website) {
            return $http.post("/api/user/"+userId+"/website", website);
        }

        function findWebsitesByUser(userId) {
            return $http.get("/api/user/"+userId+"/website");
        }

        function findWebsiteById(websiteId){
            return $http.get("/api/website/"+websiteId);
        }

        function updateWebsite(websiteId, website){
            return $http.put("/api/website/"+websiteId, website);
        }

        function deleteWebsite(websiteId){
            return $http.delete("/api/website/"+websiteId);
        }
    }
})();