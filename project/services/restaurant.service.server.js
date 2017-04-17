module.exports = function (app,restaurantModel) {
    var passport = require('passport');

    var LocalStrategy = require('passport-local').Strategy;
    app.post('/rest/restaurant/login', passport.authenticate('local'), login);
    app.post('/rest/restaurant/logout', logout);
    app.get ('/rest/restaurant/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/rest/restaurant/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/#/restaurant',
            failureRedirect: '/#/restaurant/login'
        }));
    app.get('/rest/restaurant/allrestaurants', findAllRestaurants)
    app.post("/rest/restaurant", createRestaurant);
    app.get("/rest/restaurant", findRestaurant);
    app.get("/rest/restaurant/:rid", findRestaurantById);
    app.put("/rest/restaurant/:rid", updateRestaurant);
    app.delete("/rest/restaurant/:rid", deleteRestaurant);
    app.post('/rest/restaurant/register', register);
    app.get('/rest/restaurant/loggedin', loggedin);

    function findRestaurantById(req, res) {
        var rid = req.params.rid;
        restaurantModel
            .findRestaurantById(rid)
            .then(function (restaurant) {
                res.json(restaurant);
            }, function (error) {
                res.sendStatus(500);
            });
    }

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };

    var LocalStrategy = require('passport-local').Strategy;

    //session information is maintained for currently logged in enduser
    passport.serializeUser(serializeUser);
    function serializeUser(restaurant, done) {
        done(null, restaurant);
    }

    passport.deserializeUser(deserializeUser);
    function deserializeUser(restaurant, done) {
        restaurantModel
            .findRestaurantById(restaurant._id)
            .then(
                function(restaurant){
                    done(null, restaurant);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    passport.use(new LocalStrategy(localStrategy));
    function localStrategy(username, password, done) {
        restaurantModel
            .findRestaurantByCredentials(username, password)
            .then(
                function(restaurant) {
                    if (!restaurant) { return done(null, false); }
                    return done(null, restaurant);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }
    function login(req, res) {
        var restaurant = req.body;
        res.json(restaurant);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.restaurant : '0');
    }


    function register (req, res) {
        var restaurant = req.body;
        restaurantModel
            .createRestaurant(restaurant)
            .then(
                function(restaurant){
                    if(restaurant){
                        req.login(restaurant, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(restaurant);
                            }
                        });
                    }
                }
            );
    }


    function createRestaurant(req, res) {
        var newRestaurant = req.body;
        restaurantModel
            .createRestaurant(newRestaurant)
            .then(function(newRestaurant) {
                res.json(newRestaurant);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function updateRestaurant(req, res) {
        var rid = req.params.rid;
        var restaurantNew = req.body;
        restaurantModel
            .updateRestaurant(rid,restaurantNew)
            .then(function (restaurant) {
                res.json(restaurantNew);
            }, function (error) {
                res.sendStatus(500);
            });
    }

    function findRestaurantById(req, res) {
        var rid = req.params.rid;
        restaurantModel
            .findRestaurantById(rid)
            .then(function (restaurant) {
                res.json(restaurant);
            }, function (error) {
                res.sendStatus(500);
            });
    }

    function findRestaurant(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username && password) {
            findRestaurantByCredentials(req, res);
        } else if(username) {
            findRestaurantByUsername(req, res);
        }
    }

    function findRestaurantByUsername(req, res) {
        var username = req.params.username;
        restaurantModel
            .findRestaurantByUsername(username)
            .then(function (restaurant) {
                res.json(restaurant);
            }, function (error) {
                res.sendStatus(500);
            });
    }

    function findRestaurantByCredentials(req, res){

        var username = req.query.username;
        var password = req.query.password;

        restaurantModel
            .findRestaurantByCredentials(username,password)
            .then(function (restaurant) {
                res.json(restaurant);
            }, function (error) {
                res.sendStatus(500);
            });

    }

    function deleteRestaurant(req,res){

        var rid = req.params.rid;
        restaurantModel
            .deleteRestaurant(rid)
            .then(function (restaurant) {
                res.json(restaurant);
            }, function (error) {
                res.sendStatus(500)
            });
    }

    function findAllRestaurants(req,res) {
        restaurantModel
            .findAllRestaurants()
            .then(function (restaurants) {
                res.json(restaurants);
            }, function (error) {
                res.sendStatus(500)
            });
    }
};