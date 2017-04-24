module.exports = function (app,restaurantModel) {
    var passport      = require('passport');
    var LocalStrategy = require('passport-local').Strategy;

    app.post("/rest/restaurant/login", passport.authenticate('local-restaurant'), login);
    app.post("/rest/restaurant/logout", logout);

    // app.post('/rest/restaurant/login',findRestaurantByCredentials);
    app.get("/rest/restaurant/allcuisines",findAllCuisineTypes);
    app.get('/rest/restaurant/allrestaurants', findAllRestaurants);
    app.post("/rest/restaurant", createRestaurant);
    app.get("/rest/restaurant", findRestaurant);
    app.get("/rest/restaurant/name/:resName",findRestaurantByName);
    app.get("/rest/restaurant/cuisine/:cuisineType",findRestaurantsByCuisine);

    app.get("/rest/restaurant/:rid", findRestaurantById);
    app.put("/rest/restaurant/:rid", updateRestaurant);
    app.delete("/rest/restaurant/:rid", deleteRestaurant);
    app.post('/rest/restaurant/register', register);

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
                    else{
                        res.json(null);
                    }
                }
            );
    }

    passport.use("local-restaurant",new LocalStrategy(localStrategy));
    function localStrategy(username, password, done) {

        restaurantModel
            .findRestaurantByUsername(username)
            .then(
                function(restaurant) {
                    // if the user exists, compare passwords with bcrypt.compareSync
                    if(restaurant && restaurant.password ==password){//&& bcrypt.compareSync(password, user.password)) {
                        return done(null, restaurant);
                    } else {
                        return done(null, false);
                    }
                });
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
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

    function findAllCuisineTypes(req, res) {
        restaurantModel
            .findAllCuisineTypes()
            .then(function (cuisines) {
                res.json(cuisines);
            }, function (error) {
                res.sendStatus(500);
            });
    }

    function findRestaurantByUsername(req, res) {
        var username = req.query.username;
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

    function findRestaurantsByCuisine(req,res) {
        var cuisineType = req.params.cuisineType;
        restaurantModel
            .findRestaurantsByCuisine(cuisineType)
            .then(function (restaurants) {
                res.json(restaurants);
            }, function (error) {
                res.sendStatus(500)
            });
    }

    function findRestaurantByName(req,res) {
        var resName = req.params.resName;
        restaurantModel
            .findRestaurantByName(resName)
            .then(function (restaurants) {
                res.json(restaurants);
            }, function (error) {
                res.sendStatus(500)
            });
    }
};