(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($routeParams, $location, WidgetService, FlickrService) {
        var viewModel = this;
        var userId = $routeParams['uid'];
        viewModel.userId = userId;
        var websiteId = $routeParams['wid'];
        viewModel.websiteId = websiteId;
        var pageId = $routeParams['pid'];
        viewModel.pageId = pageId;
        var widgetId = $routeParams['wgid'];
        viewModel.widgetId = widgetId;

        viewModel.searchPhotos = searchPhotos;
        viewModel.selectPhoto = selectPhoto;


        function searchPhotos(searchString) {
            FlickrService
                .searchPhotos(searchString)
                .then(function (response) {
                    data = response.data.replace("jsonFlickrApi(", "");
                    data = data.substring(0, data.length-1);
                    data = JSON.parse(data);
                    viewModel.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            var photoURL = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_b.jpg";

            var newPhoto = {
                websiteId: viewModel.websiteId,
                pageId: viewModel.pageId,
                url: photoURL,
                widgetType: 'IMAGE'
            };

            if(widgetId!="create-IMAGE"){
                WidgetService
                    .updateWidget(viewModel.widgetId, newPhoto)
                    .then(function(image){
                        $location.url("/user/"+ viewModel.userId +"/website/"+ viewModel.websiteId + "/page/"+ viewModel.pageId + "/widget/" + viewModel.widgetId);
                    });
            }
            else{
                $location.url("/user/"+ viewModel.userId +"/website/"+ viewModel.websiteId + "/page/"+ viewModel.pageId + "/widget/create-IMAGE-"
                    +photo.farm+"-"+photo.server+"-"+photo.id+"-"+photo.secret);
            }

        }
    }
})();