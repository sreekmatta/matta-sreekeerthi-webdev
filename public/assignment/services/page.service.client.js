/**
 * Created by sreematta on 2/9/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("PageService",PageService);

    function PageService() {

        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        var apiPages = {
            createPage : createPage,
            findPageByWebsiteId : findPageByWebsiteId,
            findPageById : findPageById,
            updatePage : updatePage,
            deletePage : deletePage
        }
        return apiPages;

        function createPage(websiteId, page){

        }

        function findPageByWebsiteId(websiteId) {

        }

        function findPageById(pageId) {

        }

        function updatePage(pageId, page){

        }

        function deletePage(pageId){

        }
    }
})