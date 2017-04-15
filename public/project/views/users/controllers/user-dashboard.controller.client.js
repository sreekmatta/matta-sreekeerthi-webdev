(function () {
    angular
        .module("HungryOwlAppMaker")
        .controller("UserDashboardController", UserDashboardController);

    function UserDashboardController(UserService,RestaurantService,PostService,$route,$location,$routeParams,$rootScope) {
        var viewModel = this;
        var userId = $routeParams['uid'];
        viewModel.userId = userId;
        viewModel.currentUser = $rootScope.currentUser;

        var user = null;

        //default values
        var lat = "42.343165899999995";
        var lon ="-71.1011797";

        function init() {
            var promise = UserService.findUserById(userId);
            promise.then(
                function (user) {
                    user = user.data;
                    if(user!= undefined) {
                        viewModel.user = user;
                    } else {
                        viewModel.errorMessage = "Error while loading user by ID:" + userId;
                    }
                }
            );
            getLocation();
            getAllPostByUser();
        }
        init();

        //event handlers
        viewModel.getDashboardURL = getDashboardURL;
        viewModel.newPost = newPost;
        viewModel.getLocation = getLocation;
        viewModel.createPost = createPost;
        viewModel.getRestaurantById = getRestaurantById;

        function getDashboardURL(){
            if(viewModel.user.userType == "FOODIE")
                return 'views/users/templates/foodie/foodie-dashboard.view.client.html';
        }

        function newPost(newPostDetails) {
            var promise = PostService.createPost(userId, newPostDetails);
            promise.then(function successCallback(response) {
                    newPost = response.data;
                    if(newPost) {
                        $location.url("/enduser/"+userId);
                    } else {
                        viewModel.errorMessage = "Error during Posting the Update";
                    }
                },
                function errorCallback(response) {
                    viewModel.errorMessage = "Error during Posting the Update";
                });
        }



        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            }
        }

        function showPosition(position) {
            lat = position.coords.latitude;
            lon =  position.coords.longitude;
            if(document.getElementById("lat")) {
                document.getElementById("lat").innerHTML = lat;
                document.getElementById("lon").innerHTML = lon;
            }

        }

        function createPost(newPost) {
            newPost._restaurant = document.getElementById("restaurant-id").value;
            newPost.restaurant_name = document.getElementById("restaurant").value;
            newPost._user = userId;
            var promise = PostService.createPost(userId,newPost);

            promise.then(
                function (post) {
                    post = post.data;
                    if(post != undefined) {
                        $route.reload();
                    } else {
                        viewModel.errorMessage = "Error while posting an Update";
                    }
                }
            );

        }


        function getAllPostByUser() {
            var promise = PostService.findAllPostsByUser(userId);
            promise.then(
                function (posts) {
                    posts = posts.data;
                    if(posts!= undefined) {
                        viewModel.posts = posts;
                    } else {
                        viewModel.errorMessage = "Error while Posts";
                    }
                }
            );
        }

        function getRestaurantById(resId) {
            var promise = RestaurantService.findRestaurantById(resId);
            promise.then(
                function (restaurant) {
                    restaurant = restaurant.data;
                    if(restaurant!= undefined) {
                        viewModel.restaurantName = restaurant;
                    } else {
                        return "Could not load Restaurant Info";
                    }
                }
            );
        }
    }
})();