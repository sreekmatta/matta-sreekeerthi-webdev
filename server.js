var express = require('express');
var app = express();

// install, load, and configure body parser module
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// load and configure the server to use cookie based session support.
var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

var session_secret = 'this is the secret';
if(process.env.SESSION_SECRET){
session_secret = process.env.SESSION_SECRET;
}
app.use(session({
    secret:  session_secret ,
    resave: true,
    saveUninitialized: true
}));

//Load the passport module, initialize it, and configure passport's session support.
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));


var port = process.env.PORT || 3000;

//db connection
var connectionString = 'mongodb://127.0.0.1:27017/test';

if(process.env.MONGODB_URI) {
    connectionString = process.env.MONGODB_URI;
}

var mongoose = require("mongoose");
mongoose.connect(connectionString);


require ("./test/app.js")(app);
require("./assignment/app.js")(app);
require("./project/app.js")(app);

app.listen(port);