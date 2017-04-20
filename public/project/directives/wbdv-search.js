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
                scope.searchController.findRestaurant(resName);
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

        var lat = "42.34";//setting default values
        var lon = "-71.10";//setting default values
        function setLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            }
        }

        function showPosition(position) {
            lat = position.coords.latitude;
            lon =  position.coords.longitude;
        }


        function findRestaurant(resName) {
            setLocation();
            RestaurantService.findRestaurantByName(lat,lon,resName)
                .then(
                    function successCallback(response) {
                        var restaurantsTemp = response.data;
                        var restaurants = [];
                        var dataFromURL = restaurantsTemp['restaurants'];


                        var n =20;
                        if(dataFromURL.length<10)
                            n =dataFromURL.length ;
                        for (var i = 0; i < n; i++) {
                            var restaurantDesc = dataFromURL[i];

                            var temp = {
                                label : restaurantDesc.name,
                                desc : [restaurantDesc.apiKey,false]
                            };
                            restaurants.push(temp);
                        }

                        RestaurantService.findRestaurantByNameFromDB(resName)
                            .then(
                                function successCallback(response) {

                                    if(response.data){
                                        var restaurantsFromDB = response.data;


                                        var m =10;
                                        if(restaurantsFromDB.length<10)
                                            m =restaurantsFromDB.length ;

                                        for (var j = 0; j < m; j++) {
                                            var restaurantDesc = restaurantsFromDB[j];

                                            var temp = {
                                                label : restaurantDesc.name,
                                                desc : [restaurantDesc._id,true]
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
                                    }
                                },
                                function errorCallback() {
                                    return {
                                        label:"run new search",
                                        desc:"0"};
                                }
                            );
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