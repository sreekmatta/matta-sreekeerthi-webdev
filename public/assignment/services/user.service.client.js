/**
 * Created by sreematta on 2/9/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("UserService",UserService);
    
    function UserService() {

        var users = [
            {"_id": "123", "username": "alice",    "password": "alice",    "firstName": "Alice",  "lastName": "Wonder"  },
            {"_id": "234", "username": "bob",      "password": "bob",      "firstName": "Bob",    "lastName": "Marley"  },
            {"_id": "345", "username": "charly",   "password": "charly",   "firstName": "Charly", "lastName": "Garcia"  },
            {"_id": "456", "username": "jannunzi", "password": "jannunzi", "firstName": "Jose",   "lastName": "Annunzi" }
        ];

        var apiUsers = {
            "createUser" : createUser,
            "findUserById" : findUserById,
            "findUserByUsername" : findUserByUsername,
            "findUserByCredentials" : findUserByCredentials,
            "updateUser" : updateUser,
            "deleteUser" : deleteUser
        }
        return apiUsers;

        function createUser(user) {

        }

        function findUserById(userId) {

        }

        function findUserByUsername(username) {

        }
    
        function findUserByCredentials(username, password) {

            for(u in users){
                if(users[u].username == username && users[u].password == password){
                    return users[u];
                }
            }
            return null;
        }

        function updateUser(userId, user){

        }

        function deleteUser(userId){

        }
    }

})