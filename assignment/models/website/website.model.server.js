module.exports = function (userModel,pageModel) {

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser:findAllWebsitesForUser,
        findWebsiteById:findWebsiteById,
        updateWebsite:updateWebsite,
        deleteWebsite:deleteWebsite,
        deleteUsersWebsite:deleteUsersWebsite,
        deleteWebsitesPages:deleteWebsitesPages
    };

    var mongoose = require('mongoose');
    var q = require('q');

    var WebsiteSchema = require('./website.schema.server.js')();
    var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);

    return api;

    function createWebsiteForUser(userId, website) {
        return WebsiteModel
            .create(website)
            .then(
                function (website) {
                    return userModel
                        .findUserById(userId)
                        .then(function (user) {
                            website._user = user._id;
                            user.websites.push(website._id);
                            website.save();
                            user.save();
                            return website;
                        })
                });
    }

    function findAllWebsitesForUser(userId) {
        var deferred = q.defer();
        WebsiteModel
            .find({_user:userId}, function (err, websitesForUser) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(websitesForUser);
                }
            });
        return deferred.promise;
    }

    function findWebsiteById(websiteId) {
        var deferred = q.defer();
        WebsiteModel
            .findById(websiteId, function (err, website) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(website);
                }
            });
        return deferred.promise;
    }

    function updateWebsite(websiteId, website) {
        var deferred = q.defer();
        WebsiteModel
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

    //on deleting a website
    // - delete the reference of this website saved in user
    // - delete all pages

    function deleteWebsite(websiteId) {
        return WebsiteModel.findOne({_id:websiteId}).populate('_user')
            .exec()
            .then(function (website) {
                website._user.websites.splice(website._user.websites.indexOf(websiteId),1);
                website._user.save();
                return deleteWebsitesPages(websiteId);
            });
    }


    function deleteWebsitesPages(websiteId){
        return WebsiteModel.findById({_id: websiteId}).select({'pages':1})
            .exec()
            .then(function (website) {
                var pages = website.pages;
                return Delete(pages, websiteId);
            });
    }

    function deleteUsersWebsite(websiteId){

        return WebsiteModel.findById({_id: websiteId}).select({'pages':1})
            .exec()
            .then(function (website) {
                var pages = website.pages;
                return Delete(pages, websiteId);
            });
    }

    function Delete(pages,websiteId) {
        if(pages.length == 0){
            return WebsiteModel.remove({_id: websiteId})
                .exec()
                .then(function (response) {
                    if(response.result.n == 1 && response.result.ok == 1){
                        return response;
                    }
                });
        }

        return pageModel.deletePageWidgets(pages.shift())
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    return Delete(pages, websiteId);
                }
            }, function (err) {
                return err;
            });
    }
};