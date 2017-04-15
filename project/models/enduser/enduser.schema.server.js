module.exports = function () {
    var mongoose = require('mongoose');

    var UserSchema = mongoose.Schema({
        facebook: {
            id:    String,
            token: String
        },
        userType: { type : String,
            enum : ['FOODIE', 'ADMIN'] ,
            default : 'FOODIE'},
        imageUrl:String,
        firstName: String,
        lastName: String,
        username: String,
        password: String,
        email: String,
        phone:String,
        bookmarks:[{type: mongoose.Schema.Types.ObjectId, ref: 'RestaurantModel'}],
        reviews:[{type: mongoose.Schema.Types.ObjectId, ref: 'ReviewModel'}],
        posts:[{type: mongoose.Schema.Types.ObjectId, ref: 'PostModel'}],
        followers:[{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
        following:[{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
        dateCreated: {type:Date ,default:Date.now}
    }, {collection: 'project.user'});



    return UserSchema;
};