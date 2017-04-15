module.exports = function () {

    var model = null;
    var api={
        createWidget : createWidget,
        findWidgetById:findWidgetById,
        findWidgetsByPageId:findWidgetsByPageId,
        findAllWidgetTypes:findAllWidgetTypes,
        updateWidget :updateWidget,
        deleteWidget:deleteWidget,
        deleteWidgets:deleteWidgets,
        updateWidgetOrder:updateWidgetOrder,
        setModel: setModel
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
                return model.pageModel
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

    function findWidgetsByPageId(pid) {

        return model.pageModel
            .findPageById(pid)
            .then(function (page) {
                var widgets = page.widgets;
                var n = widgets.length;
                var _widgets = [];

                return getWidgets(n, widgets, _widgets);
            });
    }

    function getWidgets(n, widgets, _widgets) {
        if(n == 0){
            return _widgets;
        }

        return WidgetModel.findById(widgets.shift()).select('-__v')
            .then(function (widget) {
                _widgets.push(widget);
                return getWidgets(--n, widgets, _widgets);
            });
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
        return model.pageModel
            .findPageById(pageId)
            .then(function (page) {
                page.widgets.splice(end, 0, page.widgets.splice(start, 1)[0]);
                page.save();
                return 200;
            }, function (err) {
                return err;
            });
    }
    function setModel(_model) {
        model = _model;
    }
}