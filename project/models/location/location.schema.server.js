module.exports = function () {
    var mongoose = require('mongoose');

    var LocationSchema = mongoose.Schema({
        address: String,
        locality: String,
        city: String,
        latitude: String,
        longitude:String,
        zipcode: Number,
        country_id: Number
    }, {collection: 'project.location'});

    return LocationSchema;
};