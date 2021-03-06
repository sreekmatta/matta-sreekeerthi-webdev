(function () {
    angular
        .module("HungryOwlAppMaker")
        .controller("UserDashboardController", UserDashboardController);

    function UserDashboardController(UserService,RestaurantService,PostService,$route,$location,$routeParams,$rootScope) {
        var viewModel = this;
        viewModel.currentUser = $rootScope.currentUser;
        var userId = viewModel.currentUser._id;

        var friendUID = $routeParams['uid'];
        if(friendUID) {
            viewModel.userId = friendUID;
            userId = friendUID;
        }

        var user = null;

        //default values
        var lat = "42.343165899999995";
        var lon ="-71.1011797";


        //event handlers
        viewModel.searchRestaurants = searchRestaurants;
        viewModel.newPost = newPost;
        viewModel.getLocation = getLocation;
        viewModel.createPost = createPost;
        viewModel.getRestaurantById = getRestaurantById;
        viewModel.findFriendByUsername = findFriendByUsername;
        viewModel.followUser = followUser;
        viewModel.unfollowUser = unfollowUser;


        function init() {
            var promise = UserService.findUserById(userId);
            promise.then(
                function (user) {
                    user = user.data;
                    if(user!= undefined) {
                        viewModel.user = user;
                        if(user.followers){
                            var promise = UserService.getAllUsersByIds(user.followers);
                            promise.then(
                                function (users) {
                                    var users = users.data;
                                    if(users!= undefined) {
                                        viewModel.allFollowers = users;
                                    } else {
                                        viewModel.errorMessage = "Sorry, Error occurred while loading followers";
                                    }
                                }
                            );
                        }

                        if(user.following){
                            var promise = UserService.getAllUsersByIds(user.following);
                            promise.then(
                                function (users) {
                                    var users = users.data;
                                    if(users!= undefined) {
                                        viewModel.allFollowing = users;
                                    } else {
                                        viewModel.errorMessage = "Sorry, Error occurred while loading people you follow";
                                    }
                                }
                            );
                        }
                    } else {
                        viewModel.errorMessage = "Error while loading user by ID:" + userId;
                    }
                }
            );
            getLocation();
            getAllPostByUser();
        }
        init();


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
            var res_desc = document.getElementById("restaurant-id").value;
            res_desc = res_desc.split(",");
            var restaurantNameForPost = document.getElementById("restaurant").value;

            if(!restaurantNameForPost||restaurantNameForPost==""){
                viewModel.errorMessage = "Location is mandatory to share a post!";
            }
            else if(!res_desc[0]){
                viewModel.errorMessage = "Please enter a valid restaurant from search results.";
            }
            else if(!newPost || !newPost.post_text){
                viewModel.errorMessage = "Please enter atleast 10 characters to post Update";
            }
            else{

                newPost._restaurant = res_desc[0];
                newPost._restaurant_local = res_desc[1];
                newPost.restaurant_name = restaurantNameForPost;
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

        function searchRestaurants() {
            var resname = $( "#resname").val();
            var radius = $( "#radius").val();
            $location.url("/restaurant/search/"+radius+"/"+resname);
        }



        function findFriendByUsername(friendUsername) {
            friendUsername = friendUsername.username;
            if(friendUsername){
                var promise = UserService.findFriendByUsername(friendUsername);
                promise.then(
                    function (friends) {
                        friends = friends.data;
                        if(friends!= undefined) {
                            viewModel.friends = friends;
                        } else {
                            viewModel.errorMessageFriends = "Sorry, No results matching the Username:" + friendUsername;
                        }
                    }
                );
            }
            else{
                viewModel.errorMessageFriends = "Please search by Username";
            }
        }


        function followUser(mainUserId, followerUserId) {
            var promise = UserService.followUser(mainUserId, followerUserId);
            promise.then(
                function (response) {
                    var users = response.data;
                    if(users!= undefined) {
                        viewModel.allFollowers = users;
                        viewModel.user.followers.push(followerUserId);
                        viewModel.currentUser.following.push(mainUserId);
                    } else {
                        viewModel.errorMessage = "Sorry, Error occurred while following the current user";
                    }
                }
            );
        }

        function unfollowUser(mainUserId,unfollowById) {
            var promise = UserService.unfollowUser(mainUserId, unfollowById);
            promise.then(
                function (response) {
                    var users = response.data;
                    if(users!= undefined) {
                        viewModel.allFollowers = users;
                        viewModel.user.followers = users;
                        viewModel.currentUser.following.splice(
                            viewModel.currentUser.following.indexOf(mainUserId),1);
                    } else {
                        viewModel.errorMessage = "Sorry, Error occurred while following the current user";
                    }
                }
            );
        }
    }
})();