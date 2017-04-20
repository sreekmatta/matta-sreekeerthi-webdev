module.exports = function (app,enduserModel) {

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var bcrypt = require("bcrypt-nodejs");
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };


    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/project/index.html#'

        }), function(req, res){
            var t  = req.user;
            var url = '/project/index.html#!/enduser/'+t._id;
            res.redirect(url);
        });


    app.post("/rest/enduser", createUser);
    app.post("/rest/login", passport.authenticate('local'), login);
    app.post("/rest/logout", logout);
    app.post("/rest/register", register);
    app.get("/rest/enduser/getall",getAllUsers);
    app.get("/rest/enduser", findUser);
    app.get("/rest/enduser/:userId", findUserById);
    app.put("/rest/enduser/:userId", updateUser);
    app.delete("/rest/enduser/:userId", deleteUser);
    app.get("/rest/loggedin", loggedin);
    app.get("/rest/enduser/findfriends/:username",searchForUsername);
    app.post("/rest/following/:mainPersonID/follower/:followerID",followUser);
    app.post("/get/users/ids",getUsersOnSetOfIDS);
    app.post("/rest/unfollow/:mainPersonID/unfollower/:followerID",unfollowUser);


    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function serializeUser(user, done) {
        done(null, user);
    }

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
            .findUserByUsername(username)
            .then(
                function(user) {
                    // if the user exists, compare passwords with bcrypt.compareSync
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                });
    }


    passport.use(new GoogleStrategy(googleConfig, googleStrategy));

    function googleStrategy(token, refreshToken, profile, done) {

        console.log("NEW PROFILE", profile,token,refreshToken);
        enduserModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {

                        console.log("NEW PROFILE", profile);
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.displayName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id
                            }
                        };
                        console.log(newGoogleUser,"NEW GOOGLE USER");
                        return enduserModel
                            .createUser(newGoogleUser)
                            .then(function(user){
                                return done(null, user);
                            });
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                })
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
        user.password = bcrypt.hashSync(user.password);
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
                    else{
                        res.json(null);
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
        user.password = bcrypt.hashSync(user.password);
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
        var user = req.body;
        var username = user.username;
        var password = user.password;
        // var username = req.query.username;
        // var password = req.query.password;

        enduserModel
            .findUserByCredentials(username,password)
            .then(function (user) {
                var tempUser = user;
                if(tempUser && bcrypt.compareSync(password, tempUser.password))
                    res.json(tempUser);
                else
                    res.sendStatus(500);
            }, function (error) {
                res.sendStatus(500);
            });

    }

    function deleteUser(req,res){
        var userId = req.params.userId;
        enduserModel
            .deleteUser(userId)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500)
            });
    }
    function getAllUsers(req,res) {
        enduserModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);
                res.json(users);
            }, function (error) {
                res.sendStatus(500)
            });
    }

    function searchForUsername(req,res) {
        var username = req.params.username;
        enduserModel
            .searchForUsername(username)
            .then(function (users) {
                res.json(users);
            }, function (error) {
                res.sendStatus(500);
            });
    }

    function followUser(req,res) {
        var mainPersonID = req.params.mainPersonID;
        var followerID = req.params.followerID;
        enduserModel
            .followUser(mainPersonID,followerID)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500);
            });

    }


    function unfollowUser(req,res) {
        var mainPersonID = req.params.mainPersonID;
        var unfollowPersonID = req.params.followerID;
        enduserModel
            .unfollowUser(mainPersonID,unfollowPersonID)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500);
            });

    }

    function getUsersOnSetOfIDS(req,res) {
        var userIds = req.body;
        enduserModel
            .getUsersOnSetOfIDS(userIds)
            .then(function (users) {
                    res.json(users);
                }, function (error) {
                    res.sendStatus(500);
                }
            );

    }
};