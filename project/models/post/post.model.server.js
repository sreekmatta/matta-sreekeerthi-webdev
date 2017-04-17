module.exports = function () {

    var model = null;
    var api = {
        createPostForUser:createPostForUser,
        findAllPostsForUser:findAllPostsForUser,
        findAllPostsForRestaurant:findAllPostsForRestaurant,
        findPostById:findPostById,
        deleteAllPostsForRestaurant:deleteAllPostsForRestaurant,
        deleteAllPostsForUser:deleteAllPostsForUser,
        updatePost:updatePost,
        setModel: setModel
    };

    var mongoose = require('mongoose');
    var q = require('q');

    var PostSchema = require('./post.schema.server.js')();
    var PostModel = mongoose.model('PostModel', PostSchema);

    return api;

    function createPostForUser(userId,post) {
        return PostModel
            .create(post)
            .then(
                function (post) {
                    return model.enduserModel
                        .findUserById(userId)
                        .then(function (user) {
                            user = user[0];
                            post._user = user._id;
                            user.posts.push(post._id);
                            post.save();
                            user.save();
                            return post;
                        })
                });

    }

    function findAllPostsForUser(userId) {
        var deferred = q.defer();
        PostModel
            .find({_user:userId}, function (err, PostsForUser) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(PostsForUser);
                }
            });
        return deferred.promise;
    }
    function deleteAllPostsForUser(userId) {
        var deferred = q.defer();
        PostModel
            .remove({_user:userId}, function (err, PostsForUser) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(PostsForUser);
                }
            });
        return deferred.promise;
    }

    function findAllPostsForRestaurant(resId) {
        var deferred = q.defer();
        PostModel
            .find({_restaurant:resId}, function (err, PostsForRestaurant) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(PostsForRestaurant);
                }
            });
        return deferred.promise;
    }

    function deleteAllPostsForRestaurant(resId) {
        var deferred = q.defer();
        PostModel
            .delete({_restaurant:resId}, function (err, PostsForRestaurant) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(PostsForRestaurant);
                }
            });
        return deferred.promise;
    }

    function findPostById(websiteId) {
        var deferred = q.defer();
        PostModel
            .findById(websiteId, function (err, website) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(website);
                }
            });
        return deferred.promise;
    }

    function updatePost(websiteId, website) {
        var deferred = q.defer();
        PostModel
            .update({_id:websiteId},
                {   _user:website._user,
                    name: website.name,
                    description: website.description,
                    pages: website.pages
                },
                function (err,website) {
                    if(err){
                        deferred.reject(err);
                    } else {
                        deferred.resolve(website);
                    }
                });

        return deferred.promise;
    }

    function setModel(_model) {
        model = _model;
    }
};