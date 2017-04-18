(function () {
    angular
        .module("HungryOwlAppMaker")
        .factory("UserService", userService);

    function userService($http) {
        var api = {
            "logout": logout,
            "login" : login,
            "register": register,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "updateUser": updateUser,
            "findUserByUsername": findUserByUsername,
            "createUser": createUser,
            "deleteUser": deleteUser,
            "findAllUsers":findAllUsers,
            "findFriendByUsername":findFriendByUsername,
            "followUser":followUser,
            "getAllUsersByIds":getAllUsersByIds
        };
        return api;

        function getAllUsersByIds(userIds) {
            return $http.post("/get/users/ids",userIds);
        }
        function followUser(mainPersonID,followerID) {
            return $http.post("/rest/following/"+mainPersonID+"/follower/"+followerID);
        }

        function findFriendByUsername(username) {
            return $http.get("/rest/enduser/findfriends/"+username);
        }

        function login(user) {
            return $http.post("/rest/login", user);
        }

        function logout(user) {
            return $http.post("/rest/logout");
        }

        function register(user) {
            return $http.post("/rest/register", user);
        }

        function createUser(newUser) {
            return $http.post("/rest/enduser", newUser);
        }

        function findUserByUsername(username) {
            return $http.get("/rest/enduser?username="+username);
        }

        function updateUser(userId, newUser) {
            return $http.put("/rest/enduser/"+userId, newUser);
        }

        function findUserById(userId) {
            return $http.get("/rest/enduser/"+userId);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/rest/enduser?username="+username+"&password="+password);
        }

        function deleteUser(userId) {
            return $http.delete("/rest/enduser/"+userId);
        }
        function findAllUsers() {
            return $http.get("/rest/enduser/getall");
        }
    }
})();