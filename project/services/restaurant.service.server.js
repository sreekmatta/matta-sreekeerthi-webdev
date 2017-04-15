module.exports = function (app,restaurantModel,$http) {
    const querystring = require('querystring');

    app.get("/rest/restaurant/:resId", findRestaurantById);
    app.post("/rest/restaurant/byname/byloc", findRestaurantByName);


    var http = require('http');


    //call sent to API
    function findRestaurantByName(req,res) {
        var searchParams = req.body;
        var resName = searchParams.resName;
        var latlon = searchParams.latlon;

        var api_key = "AIzaSyCPz-LPtXo8wNVylKpno9yt4avApBfyzGU";

        var urlBase = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=RESNAME&location=LATLON&radius=10000&key=API_KEY";
        var url = urlBase.replace("RESNAME", resName).replace("LATLON", latlon)
            .replace("API_KEY",api_key);


        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            console.log("success");
        });
    }

    function findRestaurantById(req, res) {
        var resId = req.params.resId;
        restaurantModel
            .findRestaurantById(resId)
            .then(function (restaurant) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500);
            });
    }

};