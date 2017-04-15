module.exports = function () {

    var model = null;
    var api = {

        setModel: setModel
    };

    var mongoose = require('mongoose');
    var q = require('q');

    var LocationSchema = require('./location.schema.server')();
    var LocationModel = mongoose.model('LocationModel', LocationSchema);
    return api;


    function setModel(_model) {
        model = _model;
    }
};