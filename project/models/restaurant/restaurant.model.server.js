module.exports = function () {

    var model = null;
    var api = {
        createRestaurant:createRestaurant,
        findRestaurantById:findRestaurantById,
        findRestaurantByUsername: findRestaurantByUsername,
        findRestaurantByCredentials:findRestaurantByCredentials,
        updateRestaurant:updateRestaurant,
        deleteRestaurant:deleteRestaurant,
        findAllRestaurants:findAllRestaurants,
        findRestaurantByName:findRestaurantByName,
        updateRestaurantImage:updateRestaurantImage,
        setModel: setModel
    };

    var mongoose = require('mongoose');
    var q = require('q');
    var RestaurantSchema = require('./restaurant.schema.server')();
    var RestaurantModel = mongoose.model('RestaurantModel', RestaurantSchema);

    return api;


    function createRestaurant(restaurant) {
        var deferred = q.defer();
        RestaurantModel.findOne({username:restaurant.username},
            function (err,existingRestaurant){
                if(existingRestaurant == null){
                    RestaurantModel
                        .create(restaurant, function (err, restaurant) {
                            if(err) {
                                deferred.abort(err);
                            } else {
                                deferred.resolve(restaurant);
                            }
                        });
                }
                else{
                    deferred.resolve(null);
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

    function findRestaurantByUsername(username){
        var deferred = q.defer();
        RestaurantModel
            .find({username:username}, function (err, restaurant) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(restaurant[0]);
                }
            });
        return deferred.promise;
    }


    function findRestaurantByCredentials(username,password){
        var deferred = q.defer();
        RestaurantModel
            .find({username:username,password:password}, function (err, restaurant) {
                if(!restaurant) {
                    console.log("err");
                    deferred.reject(err);
                } else {
                    deferred.resolve(restaurant[0]);
                }
            });
        return deferred.promise;
    }

    function updateRestaurantImage(rid,imageUrl) {
        var deferred = q.defer();
        RestaurantModel
            .update({_id:rid},
                {   logoUrl: imageUrl},
                function (err,restaurant) {
                    if(err){
                        deferred.reject(err);
                    } else {
                        deferred.resolve(restaurant);
                    }
                });

        return deferred.promise;
    }

    function updateRestaurant(rid,restaurant) {
        var deferred = q.defer();
        RestaurantModel
            .update({_id:rid},
                {   username: restaurant.username,
                    password: restaurant.password,
                    name: restaurant.name,
                    streetAddress: restaurant.streetAddress,
                    city: restaurant.city,
                    state: restaurant.state,
                    latitude: restaurant.latitude,
                    longitude: restaurant.longitude,
                    foodTypes: restaurant.foodTypes,
                    phone:restaurant.phone,
                    acceptsCash:restaurant.acceptsCash,
                    acceptsCard:restaurant.acceptsCard,
                    offersDelivery:restaurant.offersDelivery,
                    deliveryMin:restaurant.deliveryMin,
                    deliveryPrice:restaurant.deliveryPrice,
                    menu:restaurant.menu
                },
                function (err,restaurant) {
                    if(err){
                        deferred.reject(err);
                    } else {
                        deferred.resolve(restaurant);
                    }
                });

        return deferred.promise;
    }


    function deleteRestaurant(rid) {
        var deffered = q.defer();
        RestaurantModel
            .findByIdAndRemove(rid, function (err, restau) {
                if(err)
                    deffered.reject(err);
                else {
                    deffered.resolve(restau);
                }
            });
        return deffered.promise;
    }

    function findAllRestaurants() {
        var deferred = q.defer();
        RestaurantModel
            .find({}, function (err, restaurants) {
                if(!restaurants) {
                    console.log("err");
                    deferred.reject(err);
                } else {
                    deferred.resolve(restaurants);
                }
            });
        return deferred.promise;
    }

    function findRestaurantByName(resName) {
        var deferred = q.defer();
        RestaurantModel
            .find({name: { "$regex": resName, "$options": "i" }},
                function (err, restaurants) {
                    if(!restaurants) {
                        console.log("err");
                        deferred.reject(err);
                    } else {
                        deferred.resolve(restaurants);
                    }
                });
        return deferred.promise;
    }
    function setModel(_model) {
        model = _model;
    }
};