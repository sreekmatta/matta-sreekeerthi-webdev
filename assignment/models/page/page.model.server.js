module.exports=function () {

    var model= null;
    var api={
        "createPage" : createPage,
        "findAllPagesForWebsite": findAllPagesForWebsite,
        "findPageById" : findPageById,
        "updatePage" : updatePage,
        "deletePage" : deletePage,
        "deletePageWidgets" : deletePageWidgets,
        setModel: setModel
    };

    var mongoose = require('mongoose');
    var q = require('q');

    var PageSchema = require('./page.schema.server')();
    var PageModel = mongoose.model('PageModel',PageSchema);

    return api;

    function createPage(websiteId, page){
        return PageModel
            .create(page)
            .then(function (page) {
                return model.websiteModel
                    .findWebsiteById(websiteId)
                    .then(function (website) {
                        website.pages.push(page);
                        page._website = website._id;
                        page.websiteId=website._id
                        website.save();
                        page.save();
                        return page;
                    });
            });
    }

    function findAllPagesForWebsite(websiteId) {
        var deferred = q.defer();
        PageModel
            .find({_website:websiteId}, function (err, pagesForWebsite) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(pagesForWebsite);
                }
            });
        return deferred.promise;

    }

    function findPageById(pageId) {
        var deferred = q.defer();
        PageModel
            .findById(pageId, function (err, page) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(page);
                }
            });
        return deferred.promise;
    }

    function updatePage(pageId,page) {
        var deferred = q.defer();
        PageModel
            .update({_id:pageId},
                {   _website:page._website,
                    name: page.name,
                    title: page.title,
                    description: page.description,
                    widgets: page.widgets
                },
                function (err,page) {
                    if(err){
                        deferred.reject(err);
                    } else {
                        deferred.resolve(page);
                    }
                });

        return deferred.promise;
    }


    function deletePage(pid) {
        return PageModel
            .findById(pid)
            .populate('_website')
            .then(function (page) {
                page._website.pages.splice(page._website.pages.indexOf(pid),1);
                page._website.save();
                return deletePageWidgets(pid);
            }, function (err) {
                return err;
            });
    }


    function Delete(widgets, pid) {
        if(widgets.length == 0){
            return PageModel.remove({_id: pid})
                .then(function (response) {
                    if(response.result.n == 1 && response.result.ok == 1){
                        return response;
                    }
                }, function (err) {
                    return err;
                });
        }

        return model.widgetModel
            .deleteWidgets(widgets.shift())
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    return Delete(widgets, pid);
                }
            }, function (err) {
                return err;
            });
    }

    function deletePageWidgets(pid) {
        return PageModel.findById({_id: pid})
            .then(function (page) {
                var widgets = page.widgets;
                return Delete(widgets, pid);
            }, function (err) {
                return err;
            });
    }
    function setModel(_model) {
        model = _model;
    }
}