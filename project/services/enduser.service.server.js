module.exports = function (app,enduserModel) {

    var passport = require('passport');

    app.post('/rest/login', passport.authenticate('local'), login);
    app.post('/rest/logout', logout);
    app.get ('/rest/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/rest/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/#/enduser',
            failureRedirect: '/#/login'
        }));
    app.post("/rest/enduser", createUser);
    app.get("/rest/enduser", findUser);
    app.get("/rest/enduser/:userId", findUserById);
    app.put("/rest/enduser/:userId", updateUser);
    app.delete("/rest/enduser/:userId", deleteUser);
    app.post('/rest/register', register);
    app.get('/rest/loggedin', loggedin);


    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };


    //passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    // function facebookStrategy(token, refreshToken, profile, done) {
    //     enduserModel
    //         .findUserByFacebookId(profile.id);
    // }

    var users = [
        {"_id": "123", "username": "alice",    "password": "alice",    "firstName": "Alice",  "lastName": "Wonder","email": "alice@gmail.com" },
        {"_id": "234", "username": "bob",      "password": "bob",      "firstName": "Bob",    "lastName": "Marley","email": "bob@gmail.com"  },
        {"_id": "345", "username": "charly",   "password": "charly",   "firstName": "Charly", "lastName": "Garcia","email": "charly@gmail.com"  },
        {"_id": "456", "username": "jannunzi", "password": "jannunzi", "firstName": "Jose",   "lastName": "Annunzi","email": "jose@gmail.com" }
    ];

    var LocalStrategy = require('passport-local').Strategy;
    //var FacebookStrategy = require('passport-facebook').Strategy;

    //session information is maintained for currently logged in enduser
    passport.serializeUser(serializeUser);
    function serializeUser(user, done) {
        done(null, user);
    }

    passport.deserializeUser(deserializeUser);
    function deserializeUser(user, done) {
        enduserModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    passport.use(new LocalStrategy(localStrategy));
    function localStrategy(username, password, done) {
        enduserModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }
    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function isAdmin(req, res) {
        res.send(req.isAuthenticated() && req.user.roles && req.user.roles.indexOf('ADMIN') > -1 ? req.user : '0');
    }

    function register (req, res) {
        var user = req.body;
        enduserModel
            .createUser(user)
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                }
            );
    }


    function createUser(req, res) {
        var newUser = req.body;
        enduserModel
            .createUser(newUser)
            .then(function(user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;
        enduserModel
            .updateUser(userId,user)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500);
            });
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        enduserModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user[0]);
            }, function (error) {
                res.sendStatus(500);
            });
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username && password) {
            findUserByCredentials(req, res);
        } else if(username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.params.username;
        enduserModel
            .findUserByUsername(username)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500);
            });
    }

    function findUserByCredentials(req, res){

        var username = req.query.username;
        var password = req.query.password;

        enduserModel
            .findUserByCredentials(username,password)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500);
            });

    }

    function deleteUser(userId){
        enduserModel
            .deleteUser(userId)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500)
            });
    }
};