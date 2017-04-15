(function () {
    angular
        .module("HungryOwlAppMaker")
        .controller("AdminController", AdminController);

    function AdminController($location) {
        var viewModel = this;

        //event handlers
        viewModel.login = login;

    }
})();