(function () {
    angular
        .module("HungryOwlAppMaker")
        .config(Config);

    function Config($routeProvider,$locationProvider) {

        $routeProvider
            .when("/",{
                templateUrl: 'views/home/templates/home.view.client.html',
                controller: 'HomeController',
                controllerAs: 'model'
            })
            .when("/login",{
                templateUrl: 'views/users/templates/login.view.client.html',
                controller: 'LoginController',
                controllerAs: 'model'
            })
            .when("/register",{
                templateUrl: 'views/users/templates/register.view.client.html',
                controller: 'RegisterController',
                controllerAs: 'model'
            })
            .when("/enduser/:uid",{
                templateUrl: 'views/users/templates/user-dashboard.view.client.html',
                controller: 'UserDashboardController',
                controllerAs: 'model'
            })
            .when("/enduser/:uid/profile",{
                templateUrl: 'views/users/templates/profile.view.client.html',
                controller: 'ProfileController',
                controllerAs: 'model'
            })
            .when("/restaurant/search/:radius/:resname",{
                templateUrl: 'views/home/templates/search-results.view.client.html',
                controller: 'SearchResultsController',
                controllerAs: 'model'
            })
            .when("/restaurant/:rid/profile",{
                templateUrl: 'views/restaurant/templates/restaurant-profile.view.client.html',
                controller: 'RestaurantProfileController',
                controllerAs: 'model'
            })
            .when("/restaurant/login",{
                templateUrl: 'views/restaurant/templates/restaurant-login.view.client.html',
                controller: 'RestaurantLoginController',
                controllerAs: 'model'
            })
            .when("/restaurant/register",{
                templateUrl: 'views/restaurant/templates/restaurant-register.view.client.html',
                controller: 'RestaurantRegisterController',
                controllerAs: 'model'
            })
            .when("/restaurant/:rid/addInfo",{
                templateUrl: 'views/restaurant/templates/add-restaurant-info.view.client.html',
                controller: 'AddRestaurantInfoController',
                controllerAs: 'model'
            })
            .when("/restaurant/:rid/addMenu",{
                templateUrl: 'views/restaurant/templates/add-restaurant-menu.view.client.html',
                controller: 'AddRestaurantMenuController',
                controllerAs: 'model'
            })
            .when("/restaurant/:resName/:resid",{
                templateUrl: 'views/restaurant/templates/restaurant-details.view.client.html',
                controller: 'RestaurantDetailsController',
                controllerAs: 'model'
            })
            .when("/restaurant/:rid",{
                templateUrl: 'views/restaurant/templates/restaurant-details.view.client.html',
                controller: 'RestaurantDetailsController',
                controllerAs: 'model'
            })

    }
})();