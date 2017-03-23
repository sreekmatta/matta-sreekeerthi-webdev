module.exports = function (websiteModel) {

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials:findUserByCredentials,
        updateUser:updateUser,
        deleteUser:deleteUser
    };

    var mongoose = require('mongoose');
    var q = require('q');

    var UserSchema = require('./user.schema.server.js')();
    var UserModel = mongoose.model('UserModel', UserSchema);

    return api;

    function createUser(user) {
        var deferred = q.defer();
        UserModel
            .create(user, function (err, user) {
                if(err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function findUserById(userId){
        var deferred = q.defer();
        UserModel
            .findById(userId, function (err, user) {
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
        UserModel
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
        var deferred = q.defer();
        console.log(username+password);
        UserModel
            .find({username:username,password:password}, function (err, user) {
                if(!user) {
                    console.log("err");
                    deferred.reject(err);
                } else {
                    console.log("user me");
                    deferred.resolve(user[0]);
                }
            });
        return deferred.promise;
    }

    function updateUser(userId,user) {
        var deferred = q.defer();
        UserModel
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
        return UserModel.findById({_id: uid})
            .then(function (user) {
                var websites = user.websites;
                return Delete(websites, uid);
            });
    }

    function Delete(websites, uid) {
        if(websites.length == 0){
            return UserModel.remove({_id: uid})
                .then(function (response) {
                    if(response.result.n == 1 && response.result.ok == 1){
                        return response;
                    }
                }, function (err) {
                    return err;
                });
        }

        return websiteModel.deleteUsersWebsite(websites.shift())
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    return Delete(websites , uid);
                }
            }, function (err) {
                return err;
            });
    }
};
