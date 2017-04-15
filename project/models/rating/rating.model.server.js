module.exports = function () {

    var model = null;
    var api = {

        setModel: setModel
    };

    var mongoose = require('mongoose');
    var q = require('q');

    var RatingSchema = require('./rating.schema.server')();
    var RatingModel = mongoose.model('RatingModel', RatingSchema);
    return api;


    function setModel(_model) {
        model = _model;
    }
};