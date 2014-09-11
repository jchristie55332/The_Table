var app = angular.module('theTable', ['google-maps']);

app.controller('findController', ["$scope", "$http", function($scope, $http) {

  $scope.pleaseFindMe = function(){
    navigator.geolocation.getCurrentPosition(function(position){
      $scope.currentLat = position.coords.latitude
      $scope.currentLng = position.coords.longitude
    });
    document.getElementById("restaurant_lat").value = $scope.currentLat
    document.getElementById("restaurant_lng").value = $scope.currentLng

    console.log($scope.currentLat)


  }


}]);