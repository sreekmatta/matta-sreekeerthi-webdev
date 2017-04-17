(function () {
    angular
        .module("HungryOwlAppMaker")
        .factory("PostService", postService);

    function postService($http) {
        var api = {
            "createPost": createPost,
            "updatePost":updatePost,
            "deletePost": deletePost,
            "findAllPostsByUser":findAllPostsByUser,
            "DeleteAllPostsByUser":DeleteAllPostsByUser,
            "findPostsByRestaurantId":findPostsByRestaurantId,
            "DeleteAllPostsByRestaurant":DeleteAllPostsByRestaurant
        };
        return api;

        function createPost(userId,newPost) {
            return $http.post("/rest/enduser/"+userId+"/post", newPost);
        }
        function updatePost(postId, newPost) {
            return $http.put("/rest/post/"+postId, newPost);
        }
        function deletePost(postId) {
            return $http.delete("/rest/post/"+postId);
        }
        function findAllPostsByUser(userId) {
            return  $http.get("/rest/enduser/"+userId+"/post");
        }
        function DeleteAllPostsByUser(userId) {
            return  $http.delete("/rest/enduser/"+userId+"/post");
        }
        function DeleteAllPostsByRestaurant(resId) {
            return  $http.delete("/rest/restaurant/"+resId+"/post");
        }
        function findPostsByRestaurantId(resId) {
            return  $http.get("/rest/restaurant/"+resId+"/post");
        }
    }
})();