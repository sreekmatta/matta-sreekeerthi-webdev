module.exports = function () {
    var mongoose = require('mongoose');

    var PostSchema = mongoose.Schema({
        post_text: String,
        _restaurant: String,
        restaurant_name:String,
        _restaurant_local:{type:Boolean ,default:false},
        _user: {type:mongoose.Schema.Types.ObjectId, ref: 'EnduserModel'},
        dateCreated: {type:Date ,default:Date.now}
    }, {collection: 'project.post'});

    return PostSchema;
};