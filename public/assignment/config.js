(function () {
    angular
        .module("WebAppMaker")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/login",{
                templateUrl: 'views/user/templates/login.view.client.html',
                //controller: 'loginController',
                //controllerAs: 'model'
            })
            .when("/register",{
                templateUrl: 'views/user/templates/register.view.client.html'
            })

    }
})();