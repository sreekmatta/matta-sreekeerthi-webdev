module.exports = function () {

    var model = null;
    var api = {
        createRestaurant:createRestaurant,
        findRestaurantById:findRestaurantById,
        setModel: setModel
    };

    var mongoose = require('mongoose');
    var q = require('q');

    var RestaurantSchema = require('./restaurant.schema.server')();
    var RestaurantModel = mongoose.model('RestaurantModel', RestaurantSchema);

    return api;


    function createRestaurant(restaurant) {
        var deferred = q.defer();
        RestaurantModel
            .create(restaurant, function (err, restaurant) {
                if(err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(restaurant);
                }
            });
        return deferred.promise;
    }

    function findRestaurantById(restaurantId) {
        var deferred = q.defer();
        RestaurantModel
            .findById(restaurantId, function (err, restaurant) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(restaurant);
                }
            });
        return deferred.promise;

    }
    function setModel(_model) {
        model = _model;
    }
};