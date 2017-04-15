module.exports = function (app,postModel) {

    app.post("/rest/enduser/:userId/post", createPost);
    app.put("/rest/post/:postId", updatePost);
    app.delete("/rest/post/:postId",deletePost);
    app.get("/rest/enduser/:userId/post",findAllPostsForUser);

    function createPost(req, res) {
        var userId = req.params.userId;
        var post = req.body;

        postModel
            .createPostForUser(userId, post)
            .then(function (doc){
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500);
            });
    }

    function findAllPostsForUser(req,res) {
        var userId = req.params.userId;
        postModel
            .findAllPostsForUser(userId)
            .then(function(PostsForUser) {
                res.json(PostsForUser);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findPostById(req,res){
        var postId = req.params.postId;
        postModel
            .findPostById(postId)
            .then(function(post) {
                res.json(post);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function updatePost(req, res){
        var postId = req.params.postId;
        var post = req.body;
        postModel
            .updatePost(postId,post)
            .then(function(doc) {
                res.json(200);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function deletePost(req, res){
        var postId = req.params.postId;
        postModel
            .deletePost(postId)
            .then(function(doc) {
                res.json(200);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }
};