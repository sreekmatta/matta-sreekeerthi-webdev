module.exports = function () {

    var enduserModel = require('./enduser/enduser.model.server.js')();
    var restaurantModel = require('./restaurant/restaurant.model.server.js')();
    var postModel = require('./post/post.model.server.js')();
    var reviewModel = require('./review/review.model.server.js')();
    var locationModel = require('./location/location.model.server.js')();
    var ratingModel = require('./rating/rating.model.server.js')();

    var model = {
        enduserModel: enduserModel,
        restaurantModel: restaurantModel,
        postModel:postModel,
        reviewModel:reviewModel,
        locationModel:locationModel,
        ratingModel:ratingModel
    };

    enduserModel.setModel(model);
    restaurantModel.setModel(model);
    postModel.setModel(model);
    reviewModel.setModel(model);
    locationModel.setModel(model);
    ratingModel.setModel(model);

    return model;

};