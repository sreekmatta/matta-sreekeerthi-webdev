module.exports = function () {

    var model = null;
    var api = {

        setModel: setModel
    };

    var mongoose = require('mongoose');
    var q = require('q');


    var ReviewSchema = require('./review.schema.server')();
    var ReviewModel = mongoose.model('ReviewModel', ReviewSchema);
    return api;


    function setModel(_model) {
        model = _model;
    }
};