module.exports = function () {

    var enduserModel = require('./enduser/enduser.model.server.js')();
    var restaurantModel = require('./restaurant/restaurant.model.server.js')();
    var postModel = require('./post/post.model.server.js')();

    var model = {
        enduserModel: enduserModel,
        restaurantModel: restaurantModel,
        postModel:postModel
    };

    enduserModel.setModel(model);
    restaurantModel.setModel(model);
    postModel.setModel(model);

    return model;

};