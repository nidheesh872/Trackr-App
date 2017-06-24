'use strict';

preferencesControllers.controller('Ctrl', ['$rootScope',
    '$scope',
    '$location',
    'dataService',
    '$filter',
    '$timeout',
    '$window',
    '$routeParams',

    function ($rootScope, $scope, $location, dataService, $filter, $timeout, $window, $routeParams) {

        $scope.isLoadedData = false;
        $scope.sortBy = 'name';
        $scope.selectedProduct = {};

        loadData();
        function loadData() {
            dataService.getData().then(function (data) {
                if (data.data) {
                    $scope.data = data.data;
                    $scope.selectedProduct = $scope.data.parcels[0];
                  //  $scope.data.splice(0, 1);
                    console.log("data", data);
                } else {
                    $scope.data = {};
                }
                $scope.isLoadedData = true;
            }, function (err) {
                $scope.data = {};
                $scope.isLoadedData = true;
                console.log("service failed", err);
            });
        }

       
       
         $scope.selectProduct = function(product, $index){
          $scope.selectedProduct = angular.copy(product);
          var lat=product.live_location.latitude;
          var lng=product.live_location.longitude;
          var latlng = new google.maps.LatLng(lat, lng);
loadGoogleMap(lat, lng);
            
    }
     loadGoogleMap(44.88623409320778, -87.86480712897173);

     function loadGoogleMap(lat, lng){
    var    latlng = new google.maps.LatLng(lat, lng),
             image = 'http://www.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png';

         //zoomControl: true,
         //zoomControlOptions: google.maps.ZoomControlStyle.LARGE,

         var mapOptions = {
             center: new google.maps.LatLng(lat, lng),
             zoom: 13,
             mapTypeId: google.maps.MapTypeId.ROADMAP,
             panControl: true,
             panControlOptions: {
                 position: google.maps.ControlPosition.TOP_RIGHT
             },
             zoomControl: true,
             zoomControlOptions: {
                 style: google.maps.ZoomControlStyle.LARGE,
                 position: google.maps.ControlPosition.TOP_left
             }
         },
         map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions),
             marker = new google.maps.Marker({
                 position: latlng,
                 map: map,
                 icon: image
             });

         var input = document.getElementById('searchTextField');
         var autocomplete = new google.maps.places.Autocomplete(input, {
             types: ["geocode"]
         });

         autocomplete.bindTo('bounds', map);
         var infowindow = new google.maps.InfoWindow();

         google.maps.event.addListener(autocomplete, 'place_changed', function (event) {
             infowindow.close();
             var place = autocomplete.getPlace();
             if (place.geometry.viewport) {
                 map.fitBounds(place.geometry.viewport);
             } else {
                 map.setCenter(place.geometry.location);
                 map.setZoom(17);
             }

             moveMarker(place.name, place.geometry.location);
             $('.MapLat').val(place.geometry.location.lat());
             $('.MapLon').val(place.geometry.location.lng());
         });
         google.maps.event.addListener(map, 'click', function (event) {
             $('.MapLat').val(event.latLng.lat());
             $('.MapLon').val(event.latLng.lng());
             infowindow.close();
                     var geocoder = new google.maps.Geocoder();
                     geocoder.geocode({
                         "latLng":event.latLng
                     }, function (results, status) {
                         console.log(results, status);
                         if (status == google.maps.GeocoderStatus.OK) {
                             console.log(results);
                             var lat = results[0].geometry.location.lat(),
                                 lng = results[0].geometry.location.lng(),
                                 placeName = results[0].address_components[0].long_name,
                                 latlng = new google.maps.LatLng(lat, lng);

                             moveMarker(placeName, latlng);
                             $("#searchTextField").val(results[0].formatted_address);
                         }
                     });
         });        
        }

    
        
         function moveMarker(placeName, latlng) {
             marker.setIcon(image);
             marker.setPosition(latlng);
             infowindow.setContent(placeName);
             //infowindow.open(map, marker);
         }

    }]);