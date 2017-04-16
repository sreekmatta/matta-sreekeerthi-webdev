module.exports = function () {

    var model = null;
    var api = {
        findUserByFacebookId: findUserByFacebookId,
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials:findUserByCredentials,
        updateUser:updateUser,
        deleteUser:deleteUser,
        findAllUsers:findAllUsers,
        setModel: setModel
    };

    var mongoose = require('mongoose');
    var q = require('q');

    var EnduserSchema = require('./enduser.schema.server.js')();
    var EnduserModel = mongoose.model('EnduserModel', EnduserSchema);

    return api;


    function findUserByFacebookId(facebookId) {
        return User.findOne({'facebook.id': facebookId});
    }

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


    function findUserByCredentials(username,password){
        console.log("landed here:"+username);
        var deferred = q.defer();
        EnduserModel
            .find({username:username,password:password}, function (err, user) {
                if(!user) {
                    console.log("err");
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


    function deleteUser(uid) {
        return EnduserModel.findById({_id: uid})
            .then(function (user) {
                var websites = user.websites;
                return Delete(websites, uid);
            });
    }

    function Delete(websites, uid) {
        if(websites.length == 0){
            return EnduserModel.remove({_id: uid})
                .then(function (response) {
                    if(response.result.n == 1 && response.result.ok == 1){
                        return response;
                    }
                }, function (err) {
                    return err;
                });
        }

        return model.restaurantModel.deleteUsersWebsite(websites.shift())
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    return Delete(websites , uid);
                }
            }, function (err) {
                return err;
            });
    }

    function setModel(_model) {
        model = _model;
    }
};
