module.exports = function () {
    var mongoose = require('mongoose');

    var ReviewSchema = mongoose.Schema({
        "rating": Number,
        "review_text": String,
        "rating_color": String,
        "rating_text": String,
        "timestamp": Date
    }, {collection: 'project.review'});

    return ReviewSchema;
};