module.exports = function (app,userModel) {

    app.post("/api/user", createUser);
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    var users = [
        {"_id": "123", "username": "alice",    "password": "alice",    "firstName": "Alice",  "lastName": "Wonder","email": "alice@gmail.com" },
        {"_id": "234", "username": "bob",      "password": "bob",      "firstName": "Bob",    "lastName": "Marley","email": "bob@gmail.com"  },
        {"_id": "345", "username": "charly",   "password": "charly",   "firstName": "Charly", "lastName": "Garcia","email": "charly@gmail.com"  },
        {"_id": "456", "username": "jannunzi", "password": "jannunzi", "firstName": "Jose",   "lastName": "Annunzi","email": "jose@gmail.com" }
    ];

    function createUser(req, res) {
        var newUser = req.body;
        userModel
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
        userModel
            .updateUser(userId,user)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500);
            });
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
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
        userModel
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

        userModel
            .findUserByCredentials(username,password)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500);
            });

    }

    function deleteUser(userId){
        userModel
            .deleteUser(userId)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500)
            });
    }
};