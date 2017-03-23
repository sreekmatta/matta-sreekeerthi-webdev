(function () {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    function FlickrService($http) {

        var api = {
            "searchPhotos": searchPhotos
        };
        return api;

        function searchPhotos(searchTerm) {
            var key = "a10b0ddec6c40b4682f61ff1896c154d";
            var secret = "7f02fdc0b788cd00";
            var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }})();