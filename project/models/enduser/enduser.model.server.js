module.exports = function () {

    var model = null;
    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials:findUserByCredentials,
        updateUser:updateUser,
        deleteUser:deleteUser,
        findAllUsers:findAllUsers,
        findUserByGoogleId:findUserByGoogleId,
        searchForUsername:searchForUsername,
        followUser:followUser,
        unfollowUser:unfollowUser,
        getUsersOnSetOfIDS:getUsersOnSetOfIDS,
        setModel: setModel
    };

    var mongoose = require('mongoose');
    var q = require('q');

    var EnduserSchema = require('./enduser.schema.server.js')();
    var EnduserModel = mongoose.model('EnduserModel', EnduserSchema);

    return api;

    function createUser(user) {
        var deferred = q.defer();

        EnduserModel.findOne({username:user.username},
            function (err,existingUser){
                if(existingUser == null){
                    EnduserModel
                        .create(user, function (err, user) {
                            if(err) {
                                deferred.abort(err);
                            } else {
                                deferred.resolve(user);
                            }
                        });
                }
                else{
                    deferred.resolve(null);
                }
            });
        return deferred.promise;
    }

    function findUserById(userId){
        var deferred = q.defer();
        EnduserModel
            .find({_id:userId}, function (err, user) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function findUserByUsername(username){
        var deferred = q.defer();
        EnduserModel
            .find({username:username}, function (err, user) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(user[0]);
                }
            });
        return deferred.promise;
    }

    function findUserByGoogleId(id) {
        return EnduserModel.findOne({"google.id":id});
    }

    function findUserByCredentials(username,password){
        console.log("landed here:"+username);
        var deferred = q.defer();
        EnduserModel
            .find({username:username}, function (err, user) {
                if(!user) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(user[0]);
                }
            });
        return deferred.promise;
    }

    function findAllUsers(){
        var deferred = q.defer();
        EnduserModel
            .find({}, function (err, users) {
                if(!users) {
                    console.log("err");
                    deferred.reject(err);
                } else {
                    deferred.resolve(users);
                }
            });
        return deferred.promise;
    }

    function updateUser(userId,user) {
        var deferred = q.defer();
        EnduserModel
            .update({_id:userId},
                {   username: user.username,
                    password: user.password,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    bookmarks: user.bookmarks,
                    phone:user.phone},
                function (err,user) {
                    if(err){
                        deferred.reject(err);
                    } else {
                        deferred.resolve(user);
                    }
                });

        return deferred.promise;
    }


    function deleteUser(userId) {
        var deffered = q.defer();
        EnduserModel
            .findByIdAndRemove(userId, function (err, user) {
                if(err)
                    deffered.reject(err);
                else {
                    deffered.resolve(user);
                }
            });
        return deffered.promise;
    }

    function searchForUsername(uname) {
        var deferred = q.defer();
        EnduserModel
            .find({username: { "$regex": uname, "$options": "i" }}, function (err, users) {
                if(!users) {
                    console.log("err");
                    deferred.reject(err);
                } else {
                    deferred.resolve(users);
                }
            });
        return deferred.promise;
    }

    function unfollowUser(mainPersonID,followerID) {
        var deferred = q.defer();
        EnduserModel
            .find({_id:mainPersonID}, function (err, users) {
                var mainPerson = users[0];
                if(!mainPerson) {
                    console.log("err");
                    deferred.reject(err);
                } else {
                    EnduserModel
                        .find({_id:followerID}, function (err, users) {
                            var unfollower = users[0];
                            if(!unfollower) {
                                console.log("err");
                                deferred.reject(err);
                            } else {
                                var index_m = mainPerson.followers.indexOf(unfollower._id);
                                mainPerson.followers.splice(index_m, 1);
                                var index_u = unfollower.following.indexOf(mainPerson._id);
                                unfollower.following.splice(index_u, 1);
                                mainPerson.save();
                                unfollower.save();

                                EnduserModel
                                    .find({ _id: { $in: mainPerson.followers}},
                                        function (err, users) {

                                            deferred.resolve(users);
                                        });
                            }
                        });
                }
            });
        return deferred.promise;
    }
    function followUser(mainPersonID,followerID) {
        var deferred = q.defer();
        EnduserModel
            .find({_id:mainPersonID}, function (err, users) {
                var mainPerson = users[0];
                if(!mainPerson) {
                    console.log("err");
                    deferred.reject(err);
                } else {
                    EnduserModel
                        .find({_id:followerID}, function (err, users) {
                            var follower = users[0];
                            if(!follower) {
                                console.log("err");
                                deferred.reject(err);
                            } else {
                                mainPerson.followers.push(follower._id);
                                follower.following.push(mainPerson._id)
                                mainPerson.save();
                                follower.save();
                                EnduserModel
                                    .find({ _id: { $in: mainPerson.followers}},
                                        function (err, users) {

                                            deferred.resolve(users);
                                        });
                            }
                        });
                }
            });
        return deferred.promise;
    }

    function getUsersOnSetOfIDS(userIds){
        var deferred = q.defer();
        EnduserModel
            .find({ _id: { $in: userIds}},
                function (err, users) {
                    deferred.resolve(users);
                });
        return deferred.promise;
    }

    function setModel(_model) {
        model = _model;
    }
};
