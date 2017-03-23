module.exports = function (app) {
    var userModel = require('./models/user/user.model.server')(websiteModel);
    var websiteModel = require('./models/website/website.model.server')(userModel,pageModel);
    var pageModel = require('./models/page/page.model.server')(websiteModel,widgetModel);
    var widgetModel = require('./models/widget/widget.model.server')(pageModel);


    require('./services/user.service.server')(app, userModel);
    require('./services/website.service.server')(app, websiteModel);
    require('./services/page.service.server')(app, pageModel);
    require('./services/widget.service.server')(app, widgetModel);

};