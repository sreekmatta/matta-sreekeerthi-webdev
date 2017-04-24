(function () {
    angular
        .module("HungryOwlAppMaker")
        .config(Config);

    function Config($routeProvider,$locationProvider) {

        $routeProvider
            .when("/",{
                templateUrl: 'views/home/templates/home.view.client.html',
                controller: 'HomeController',
                controllerAs: 'model',
                resolve: { loggedin: checkLoggedin }
            })
            .when("/login",{
                templateUrl: 'views/users/templates/login.view.client.html',
                controller: 'LoginController',
                controllerAs: 'model',
                resolve: { loggedin: checkLoggedin }
            })
            .when("/logout",{
                templateUrl: 'views/home/templates/home.view.client.html',
                controller: 'LogoutController',
                controllerAs: 'model',
                resolve: { loggedin: checkLoggedin}
            })
            .when("/register",{
                templateUrl: 'views/users/templates/register.view.client.html',
                controller: 'RegisterController',
                controllerAs: 'model',
                resolve: { loggedin: checkLoggedin }
            })
            .when("/enduser",{
                templateUrl: 'views/users/templates/foodie/foodie-dashboard.view.client.html',
                controller: 'UserDashboardController',
                controllerAs: 'model',
                resolve: { loggedin: checkLoggedin }
            })
            .when("/enduser/profile",{
                templateUrl: 'views/users/templates/profile.view.client.html',
                controller: 'ProfileController',
                controllerAs: 'model',
                resolve: { loggedin: checkLoggedin }
            })
            .when("/enduser/:uid",{
                templateUrl: 'views/users/templates/foodie/foodie-dashboard.view.client.html',
                controller: 'UserDashboardController',
                controllerAs: 'model',
                resolve: { loggedin: checkLoggedin }
            })
            .when("/admin/manage/user",{
                templateUrl: 'views/users/templates/admin/manage-users.view.client.html',
                controller: 'ManageUserController',
                controllerAs: 'model',
                resolve: { loggedin: checkLoggedin }
            })
            .when("/admin/manage/user/add",{
                templateUrl: 'views/users/templates/admin/admin-add-user.view.client.html',
                controller: 'ManageUserController',
                controllerAs: 'model',
                resolve: { loggedin: checkLoggedin }
            })
            .when("/admin/manage/user/:userId",{
                templateUrl: 'views/users/templates/admin/admin-edit-user.view.client.html',
                controller: 'ManageUserController',
                controllerAs: 'model',
                resolve: { loggedin: checkLoggedin }
            })
            .when("/admin/manage/restaurant",{
                templateUrl: 'views/users/templates/admin/manage-restaurants.view.client.html',
                controller: 'ManageRestaurantController',
                controllerAs: 'model',
                resolve: { loggedin: checkLoggedin }
            })
            .when("/admin/manage/restaurant/add",{
                templateUrl: 'views/users/templates/admin/admin-add-restaurant.view.client.html',
                controller: 'ManageRestaurantController',
                controllerAs: 'model',
                resolve: { loggedin: checkLoggedin }
            })
            .when("/admin/manage/restaurant/:resId",{
                templateUrl: 'views/users/templates/admin/admin-edit-restaurant.view.client.html',
                controller: 'ManageRestaurantController',
                controllerAs: 'model',
                resolve: { loggedin: checkLoggedin }
            })
            .when("/admin",{
                templateUrl: 'views/users/templates/admin/admin-dashboard.view.client.html',
                controller: 'AdminDashboardController',
                controllerAs: 'model',
                resolve: { loggedin: checkLoggedin }
            })
            .when("/restaurant",{
                templateUrl: 'views/restaurant/templates/restaurant-details.view.client.html',
                controller: 'RestaurantDetailsController',
                controllerAs: 'model',
                resolve: { loggedin: checkLoggedin}
            })
            .when("/restaurant/profile",{
                templateUrl: 'views/restaurant/templates/restaurant-profile.view.client.html',
                controller: 'RestaurantProfileController',
                controllerAs: 'model',
                resolve: { loggedin: checkLoggedin}
            })
            .when("/restaurant/search/:radius/:resname",{
                templateUrl: 'views/home/templates/search-results.view.client.html',
                controller: 'SearchResultsController',
                controllerAs: 'model',
                resolve: { loggedin: checkLoggedin }
            })
            .when("/restaurant/:apiResId/:lat/:lon",{
                templateUrl: 'views/restaurant/templates/restaurant-details.view.client.html',
                controller: 'RestaurantDetailsController',
                controllerAs: 'model',
                resolve: { loggedin: checkLoggedin}
            })
            .when("/restaurant/login",{
                templateUrl: 'views/restaurant/templates/restaurant-login.view.client.html',
                controller: 'RestaurantLoginController',
                controllerAs: 'model',
                resolve: { loggedin: checkLoggedin}
            })
            .when("/restaurant/register",{
                templateUrl: 'views/restaurant/templates/restaurant-register.view.client.html',
                controller: 'RestaurantRegisterController',
                controllerAs: 'model',
                resolve: { loggedin: checkLoggedin}
            })

            .when("/restaurant/addInfo",{
                templateUrl: 'views/restaurant/templates/add-restaurant-info.view.client.html',
                controller: 'AddRestaurantInfoController',
                controllerAs: 'model',
                resolve: { loggedin: checkLoggedin}
            })
            .when("/restaurant/addMenu",{
                templateUrl: 'views/restaurant/templates/add-restaurant-menu.view.client.html',
                controller: 'AddRestaurantMenuController',
                controllerAs: 'model',
                resolve: { loggedin: checkLoggedin}
            })
            .when("/restaurant/:resName/:resid",{
                templateUrl: 'views/restaurant/templates/restaurant-details.view.client.html',
                controller: 'RestaurantDetailsController',
                controllerAs: 'model',
                resolve: { loggedin: checkLoggedin}
            })
            .when("/restaurant/:resid",{
                templateUrl: 'views/restaurant/templates/restaurant-details.view.client.html',
                controller: 'RestaurantDetailsController',
                controllerAs: 'model',
                resolve: { loggedin: checkLoggedin}
            })
            .otherwise({redirectTo:'/'});

    }
})();

var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
    var deferred = $q.defer();

    $http.get('/rest/loggedin')
        .then(function(user) {
            $rootScope.errorMessage = null;
            if (user.data && user.data.length!=0 && user.data !== '0') {
                user = user.data;
                $rootScope.currentUser = user[0];
                deferred.resolve();
            }
            else {
                $rootScope.currentUser = null;
                deferred.resolve();
            }
        });
    return deferred.promise;
};