var express = require('express');
var app = express();

// install, load, and configure body parser module
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));


var port = process.env.PORT || 3000;

require ("./test/app.js")(app);
var assignment = require("./assignment/app.js");
assignment(app);

app.listen(port);