module.exports = function () {
    var mongoose = require('mongoose');

    var UserSchema = mongoose.Schema({
        userType: { type : String,
            enum : ['FOODIE', 'ADMIN'] ,
            default : 'FOODIE'},
        firstName: String,
        lastName: String,
        username: String,
        password: String,
        email: String,
        google: {
            id:    String
        },
        followers:[{type: mongoose.Schema.Types.ObjectId, ref: 'EnduserModel'}],
        following:[{type: mongoose.Schema.Types.ObjectId, ref: 'EnduserModel'}],
        posts:[{type: mongoose.Schema.Types.ObjectId, ref: 'PostModel'}],
        dateCreated: {type:Date ,default:Date.now}
    }, {collection: 'project.user'});



    return UserSchema;
};