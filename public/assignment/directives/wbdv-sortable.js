(function () {
    angular
        .module("wbdvDirectives")
        .directive("wbdvSortable" ,wbdvSortableDir );

    function wbdvSortableDir(){
        function linkFunction(scope,element) {
            element.sortable({
                axis: "y", scroll:false, handle:'.glyphicon-align-justify'
            });
        }
        return{
            link: linkFunction
        }

    }

})();