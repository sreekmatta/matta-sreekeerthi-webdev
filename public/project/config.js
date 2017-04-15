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
    }
})();