module.exports = function(app) {
    //db connection
    var connectionString = 'mongodb://127.0.0.1:27017/test';

    if(process.env.MONGODB_URI) {
        connectionString = process.env.MONGODB_URI;
    }

    var mongoose = require("mongoose");
    mongoose.connect(connectionString);

    var models = require('./models/models.server')();
    require("./services/enduser.service.server.js")(app,models.enduserModel);
    require("./services/restaurant.service.server.js")(app,models.restaurantModel);
    require("./services/post.service.server.js")(app,models.postModel);
};