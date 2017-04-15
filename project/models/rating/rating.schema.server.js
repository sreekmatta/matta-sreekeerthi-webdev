module.exports = function () {
    var mongoose = require('mongoose');

    var RatingSchema = mongoose.Schema({
        "aggregate_rating": String,
        "rating_text": String,
        "rating_color": String,
        "votes": Number
    }, {collection: 'project.rating'});

    return RatingSchema;
};