module.exports = function () {
    var mongoose = require('mongoose');

    var RestaurantSchema = mongoose.Schema({
        name: String,
        userType: { type : String,
            default : 'RESTAURANT'},
        logoUrl: String,
        streetAddress: String,
        city: String,
        state: String,
        latitude:String,
        longitude:String,
        foodTypes: [String],
        phone: Number,
        dateCreated: {type:Date ,default:Date.now}
    }, {collection: 'project.restaurant'});

    return RestaurantSchema;
};