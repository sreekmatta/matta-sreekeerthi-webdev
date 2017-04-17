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
            .when("/logout",{
                templateUrl: 'views/home/templates/home.view.client.html',
                controller: 'LogoutController',
                controllerAs: 'model'
            })
            .when("/register",{
                templateUrl: 'views/users/templates/register.view.client.html',
                controller: 'RegisterController',
                controllerAs: 'model'
            })
            .when("/enduser/:uid",{
                templateUrl: 'views/users/templates/foodie/foodie-dashboard.view.client.html',
                controller: 'UserDashboardController',
                controllerAs: 'model'
            })
            .when("/admin/:uid/manage/user",{
                templateUrl: 'views/users/templates/admin/manage-users.view.client.html',
                controller: 'ManageUserController',
                controllerAs: 'model'
            })
            .when("/admin/:uid/manage/user/add",{
                templateUrl: 'views/users/templates/admin/admin-add-user.view.client.html',
                controller: 'ManageUserController',
                controllerAs: 'model'
            })
            .when("/admin/:uid/manage/user/:userId",{
                templateUrl: 'views/users/templates/admin/admin-edit-user.view.client.html',
                controller: 'ManageUserController',
                controllerAs: 'model'
            })
            .when("/admin/:uid/manage/restaurant",{
                templateUrl: 'views/users/templates/admin/manage-restaurants.view.client.html',
                controller: 'ManageRestaurantController',
                controllerAs: 'model'
            })
            .when("/admin/:uid/manage/restaurant/add",{
                templateUrl: 'views/users/templates/admin/admin-add-restaurant.view.client.html',
                controller: 'ManageRestaurantController',
                controllerAs: 'model'
            })
            .when("/admin/:uid/manage/restaurant/:resId",{
                templateUrl: 'views/users/templates/admin/admin-edit-restaurant.view.client.html',
                controller: 'ManageRestaurantController',
                controllerAs: 'model'
            })
            .when("/admin/:uid",{
                templateUrl: 'views/users/templates/admin/admin-dashboard.view.client.html',
                controller: 'AdminDashboardController',
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
            .when("/restaurant/:rid/:lat/:lon",{
                templateUrl: 'views/restaurant/templates/restaurant-details.view.client.html',
                controller: 'RestaurantDetailsController',
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

            .otherwise({redirectTo:'/'});

    }
})();