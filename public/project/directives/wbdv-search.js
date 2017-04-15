(function () {
    angular
        .module("wbdvDirectives",[])
        .directive("wbdvSearch" ,wbdvSearchDir );

    function wbdvSearchDir(){
        function linkFunction(scope,element,attributes) {

            var restaurants = [];
            $( "#restaurant" ).autocomplete({
                minLength: 0,
                source: restaurants,
                focus: function( event, ui ) {
                    $( "#restaurant" ).val( ui.item.label );
                    $( "#restaurant-id" ).val( ui.item.desc );
                    return false;
                },
                select: function( event, ui ) {
                    $( "#restaurant" ).val( ui.item.label );
                    $( "#restaurant-id" ).val( ui.item.desc );
                    return false;
                }
            }).autocomplete( "instance" )._renderItem = function( ul, item ) {
                return $( "<li class='ho-list'>" )
                    .append( "<div>"+item.label + "</div>")
                    .appendTo( ul );
            };

            element.on('input', function() {
                var resName = document.getElementById('restaurant').value;
                var lat = document.getElementById('lat').innerHTML;
                var lon = document.getElementById('lon').innerHTML;
                scope.searchController.findRestaurant(lat,lon,resName);
            });
        }

        return{
            scope: {},
            link: linkFunction,
            controller: searchController,
            controllerAs: 'searchController'
        }
    }

    function searchController(RestaurantService) {
        var vm = this;
        vm.findRestaurant = findRestaurant;

        function findRestaurant(lat,lon,resName) {
            RestaurantService.findRestaurantByName(lat,lon,resName)
                .then(
                function successCallback(response) {
                    var restaurantsTemp = response.data;
                    var restaurants = [];
                    var dataFromURL = restaurantsTemp['restaurants'];


                    var n =10;
                    if(dataFromURL.length<10)
                        n =dataFromURL.length ;
                    for (var i = 0; i < n; i++) {
                        var restaurantDesc = dataFromURL[i];

                        var temp = {
                            label : restaurantDesc.name,
                            desc : restaurantDesc.apiKey
                        };
                        restaurants.push(temp);
                    }



                    $( "#restaurant" ).autocomplete({
                        minLength: 0,
                        source: restaurants,
                        focus: function( event, ui ) {
                            $( "#restaurant" ).val( ui.item.label );
                            $( "#restaurant-id" ).val( ui.item.desc );
                            return false;
                        },
                        select: function( event, ui ) {
                            $( "#restaurant" ).val( ui.item.label );
                            $( "#restaurant-id" ).val( ui.item.desc );
                            return false;
                        }
                    }).autocomplete( "instance" )._renderItem = function( ul, item ) {
                        return $( "<li class='ho-list'>" )
                            .append( "<div>"+item.label + "</div>")
                            .appendTo( ul );
                    };
                },
                function errorCallback(response) {
                    return {
                        label:"run new search",
                        desc:"0"};
                }
            );


        }
    }
})();