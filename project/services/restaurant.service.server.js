module.exports = function (app,restaurantModel) {

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post('/rest/restaurant/login', findRestaurantByCredentials);
    app.get('/rest/restaurant/allrestaurants', findAllRestaurants)
    app.get("/rest/restaurant", findRestaurant);
    app.get("/rest/restaurant/:rid", findRestaurantById);
    app.put("/rest/restaurant/:rid", updateRestaurant);
    app.delete("/rest/restaurant/:rid", deleteRestaurant);
    app.post('/rest/restaurant/register', createRestaurant);
    app.get("/rest/restaurant/name/:resName",findRestaurantByName);
    app.post ("/rest/restaurant/upload", upload.single('restaurantImage'), uploadImage);

    function uploadImage(req, res) {
        var resId = req.body.name;
        var myFile = req.file;
        if(myFile!=null)
        {
            var url = req.protocol + '://' +req.get('host')+"/uploads/"+myFile.filename;
            var logoUrl = url;

            restaurantModel
                .updateRestaurantImage(resId,logoUrl)
                .then(function (restaurant) {
                    var imageUploaded = "1";
                    res.redirect("/project/index.html#!/restaurant/redirect/"+imageUploaded+"/"+resId);
                }, function (error) {
                    res.sendStatus(500);
                });

        }
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