module.exports = function (app,enduserModel) {

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var bcrypt = require("bcrypt-nodejs");

    app.post("/rest/enduser", createUser);
    app.post("/rest/login", passport.authenticate('local'), login);
    //app.post('/rest/login',findUserByCredentials);
    app.post("/rest/logout", logout);
    app.post("/rest/register", register);
    app.get ("/rest/auth/facebook", passport.authenticate('facebook', { scope : 'email' }));
    app.get("/rest/auth/facebook/callback",
        passport.authenticate('facebook', {
            successRedirect: '/#/enduser',
            failureRedirect: '/#/login'
        }));
    app.get("/rest/enduser/getall",getAllUsers);

    app.get("/rest/enduser", findUser);
    app.get("/rest/enduser/:userId", findUserById);
    app.put("/rest/enduser/:userId", updateUser);
    app.delete("/rest/enduser/:userId", deleteUser);
    app.get("/rest/loggedin", loggedin);


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
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if(user.username === username && user.password === password) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
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
                    {
                        res.json(null);//username already exists
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
};