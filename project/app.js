module.exports = function(app) {
    var models = require('./models/models.server')();
    require("./services/enduser.service.server.js")(app,models.enduserModel);
    require("./services/restaurant.service.server.js")(app,models.restaurantModel);
    require("./services/post.service.server.js")(app,models.postModel);
    require("./services/review.service.server.js")(app,models.reviewModel);
    require("./services/location.service.server.js")(app,models.locationModel);
    require("./services/rating.service.server.js")(app,models.ratingModel);
};