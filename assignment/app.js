module.exports = function(app) {
    var models = require('./models/models.server')();
    require("./services/user.service.server.js")(app,models.userModel);
    require("./services/website.service.server.js")(app,models.websiteModel);
    require("./services/page.service.server.js")(app,models.pageModel);
    require("./services/widget.service.server.js")(app,models.widgetModel);

};