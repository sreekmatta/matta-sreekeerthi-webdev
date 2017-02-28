module.exports = function (app) {

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
        var user = req.body;
        var userId = Math.floor(Date.now() / 1000);
        var userDetails =
            {   "_id":userId,
                "username":user.username,
                "password":user.password,
                "firstName":user.firstName,
                "lastName":user.lastName,
                "email":user.email
            };

        users.push(userDetails); // added a new user at the end of the array
        res.json(userDetails);
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;
        console.log("In Update"+userId+user);
        for(u in users){
            if(users[u]._id == userId){
                users[u].username = user.username;
                users[u].password = user.password;
                users[u].firstName = user.firstName;
                users[u].lastName = user.lastName;
                users[u].email = user.email;
                res.sendStatus(200);
            }
        }
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        var user = users.find(function (u) {
            return u._id == userId;
        });
        if(user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
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
        var user = users.find(function (u) {
            return u.username == req.query.username;
        });
        console.log(user);
        if(user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    }

    function findUserByCredentials(req, res){
        var username = req.query.username;
        var password = req.query.password;
        var user = users.find(function(user){
            return user.password == password && user.username == username;
        });

        res.json(user);

    }

    function deleteUser(userId){
        for(u in users){
            if(users[u]._id == userId){
                var removedUser = users.splice(u,1);
                res.sendStatus(200);
            }
        }
    }
};