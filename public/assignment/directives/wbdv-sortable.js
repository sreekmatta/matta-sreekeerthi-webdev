(function () {
    angular
        .module("wbdvDirectives",[])
        .directive("wbdvSortable" ,wbdvSortableDir );

    function wbdvSortableDir(){
        function linkFunction(scope,element,attributes) {
            var start = -1;
            var end = -1;
            var pageId = attributes.pageid;

            element.sortable({
                axis: "y", scroll:false, handle:'.glyphicon-align-justify',
                start: function (event, ui) {
                    start = $(ui.item).index();
                },
                stop: function (event, ui) {
                    end = $(ui.item).index();
                    scope.sortableController.sort(pageId,start,end);
                }
            });
        }

        return{
            scope: {},
            link: linkFunction,
            controller: sortableController,
            controllerAs: 'sortableController'
        }
    }

    function sortableController(WidgetService) {
        var vm = this;
        vm.sort = sort;

        function sort(pageId,start,end) {
            WidgetService.sort(pageId,start,end);
        }
    }
})();