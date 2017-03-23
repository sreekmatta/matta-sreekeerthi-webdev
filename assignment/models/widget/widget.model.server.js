module.exports = function (pageModel) {
    var api={
        createWidget : createWidget,
        findWidgetById:findWidgetById,
        findWidgetsByPageId:findWidgetsByPageId,
        findAllWidgetTypes:findAllWidgetTypes,
        updateWidget :updateWidget,
        deleteWidget:deleteWidget,
        deleteWidgets:deleteWidgets,
        updateWidgetOrder:updateWidgetOrder,
    };

    var mongoose = require('mongoose');
    var q = require('q');


    var WidgetSchema = require('./widget.schema.server')();
    var WidgetModel = mongoose.model('WidgetModel',WidgetSchema);

    return api;

    function createWidget(pageId,widget) {

        return WidgetModel
            .create(widget)
            .then(function (widget) {
                return pageModel
                    .findPageById(pageId)
                    .then(function (page) {
                        widget._page = page._id;
                        page.widgets.push(widget._id);
                        widget.save();
                        page.save();
                        return widget;
                    }, function (err) {
                        return err;
                    });
            }, function (err) {
                return err;
            });
    }

    function findAllWidgetTypes() {
        return WidgetModel.schema.path('type').enumValues;
    }
    
    function findWidgetById(widgetId) {
        var deferred = q.defer();
        WidgetModel
            .findById(widgetId, function (err, widget) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(widget);
                }
            });
        return deferred.promise;
    }

    function findWidgetsByPageId(pageId) {
        var deferred = q.defer();
        WidgetModel
            .find({_page:pageId}, function (err, widgetsByPageId) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(widgetsByPageId);
                }
            });
        return deferred.promise;
    }


    function updateWidget(widgetId,widget) {
        return WidgetModel.update({_id:widgetId},{$set: widget})
            .exec()
            .then(function (widget) {
                return widget;
            });
    }


    function deleteWidget(wid){
        return WidgetModel.findById(wid).populate('_page').then(function (widget) {
            widget._page.widgets.splice(widget._page.widgets.indexOf(wid),1);
            widget._page.save();

            return WidgetModel.remove({_id:wid});
        });
    }

    function deleteWidgets(wid) {
        return WidgetModel.findById(wid)
            .then(function (widget) {
                return WidgetModel.remove({_id: wid});
            }, function (err) {
                return err;
            });
    }

    function updateWidgetOrder(pageId, start, end) {
        return pageModel
            .findPageById(pageId)
            .then(function (page) {
                page.widgets.splice(end, 0, page.widgets.splice(start, 1)[0]);
                page.save();
                return 200;
            }, function (err) {
                return err;
            });
    }

}