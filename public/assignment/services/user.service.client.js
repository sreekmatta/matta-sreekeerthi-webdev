/**
 * Created by sreematta on 2/9/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("UserService",UserService);

    function UserService() {

        var users = [
            {"_id": "123", "username": "alice",    "password": "alice",    "firstName": "Alice",  "lastName": "Wonder","email": "alice@gmail.com" },
            {"_id": "234", "username": "bob",      "password": "bob",      "firstName": "Bob",    "lastName": "Marley","email": "bob@gmail.com"  },
            {"_id": "345", "username": "charly",   "password": "charly",   "firstName": "Charly", "lastName": "Garcia","email": "charly@gmail.com"  },
            {"_id": "456", "username": "jannunzi", "password": "jannunzi", "firstName": "Jose",   "lastName": "Annunzi","email": "jose@gmail.com" }
        ];

        var api = {
            "createUser" : createUser,
            "findUserById" : findUserById,
            "findUserByUsername" : findUserByUsername,
            "findUserByCredentials" : findUserByCredentials,
            "updateUser" : updateUser,
            "deleteUser" : deleteUser
        };
        return api;

        function createUser(user) {
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
            return userDetails;
        }

        function findUserById(userId) {
            for(u in users){
                if(users[u]._id == userId){
                    return angular.copy(users[u]);
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            for(u in users){
                if(users[u].username == username){
                    return angular.copy(users[u]);
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(u in users){
                if(users[u].username == username && users[u].password == password){
                    return angular.copy(users[u]);
                }
            }

            return null;
        }

        function updateUser(userId, user){
            for(u in users){
                if(users[u]._id == userId){
                    users[u].username = user.username;
                    users[u].password = user.password;
                    users[u].firstName = user.firstName;
                    users[u].lastName = user.lastName;
                    users[u].email = user.email;
                    return user;
                }
            }
            return null;
        }

        function deleteUser(userId){
            for(u in users){
                if(users[u]._id == userId){
                    var removedUser = users.splice(u,1);
                    return removedUser;
                }
            }
            return null;
        }
    }

})();