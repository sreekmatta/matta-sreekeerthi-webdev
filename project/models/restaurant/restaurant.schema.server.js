module.exports = function () {
    var mongoose = require('mongoose');

    var RestaurantSchema = mongoose.Schema({
        name: String,
        userType: { type : String,
            default : 'RESTAURANT'},
        logoUrl: String,
        username:String,
        password: String,
        streetAddress: String,
        city: String,
        state: String,
        latitude:String,
        longitude:String,
        foodTypes: {type:[String] ,default:[]},
        acceptsCash:Boolean,
        acceptsCard:Boolean,
        offersDelivery:Boolean,
        deliveryMin:{type:Number ,default:0},
        deliveryPrice:{type:Number ,default:0},
        phone: String,
        menu: String,
        record:{type:String, default:'LOCAL'},
        dateCreated: {type:Date ,default:Date.now}
    }, {collection: 'project.restaurant'});

    return RestaurantSchema;
};