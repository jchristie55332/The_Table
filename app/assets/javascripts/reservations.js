app.controller('reservationsController', ["$scope", "$http", function($scope, $http) {
  $http.get("/restaurant_reservations.json").success(function(data){
    $scope.reservations = data;
  });
}]);