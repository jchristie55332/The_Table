

  
  app.controller('mapController', ["$scope", "$http", function($scope, $http) {
    $scope.map = {
      center: {latitude: 50.522420999999994, longitude: -0.109708 },
      zoom: 11
    };

    $http.get("/restaurants.json").success(function(data){
      navigator.geolocation.getCurrentPosition(function(position){
        $scope.$apply(function() {
          $scope.currentLat = position.coords.latitude
        $scope.currentLng = position.coords.longitude
        $scope.map.center = {latitude: $scope.currentLat, longitude: $scope.currentLng };

        for (var i = 0; i < data.length; i++) {

          var lat1 = data[i].lat;
          var lon1 = data[i].lng;
          var lat2 = $scope.currentLat;
          var lon2 = $scope.currentLng;  
          var R = 6371;

          var dLat = (lat2-lat1) * (Math.PI/180);
          var dLon = (lon2-lon1) * (Math.PI/180); 
          var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos((lat1) * (Math.PI/180)) * Math.cos((lat2) * (Math.PI/180)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
          var d = R * c;
          d = (Math.round(d*100)/100).toFixed(2)
          data[i].distance = d;
          data[i].hide = true;
          data[i].hide_max = true;
          $scope.hello = true;
        }
      })
      });

      $scope.restaurants = data;

    });

    $scope.selectRestaurant = function(restaurant){
      $scope.selectedRestaurant = restaurant;
    }

    $scope.hideSelectRestaurant = function(){
      $scope.selectedRestaurant = false;
    }

    $scope.showSearch = function(){
      $scope.boo = true;
    }

    $scope.numSearch = function(){
      for (var i = 0; i < $scope.restaurants.length; i++) {
        if($scope.restaurants[i].price >= $scope.nums){
          $scope.restaurants[i].hide = false;
        }else{
          $scope.restaurants[i].hide = true;
        }
      }
    }

    $scope.hideSearch = function(){
      $scope.boo = false;
    }

    $scope.currentPage = 0;
    $scope.pageSize = 1;
    $scope.numberOfPages=function(){
      if($scope.restaurants){
      return Math.ceil($scope.restaurants.length/$scope.pageSize);
      };                
    }

  }]);
  app.filter('startFrom', function() {
      return function(input, start) {
          start = +start; //parse to int
          if(input){
            return input.slice(start);
          };
      }
  });

  
