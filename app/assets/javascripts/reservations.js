app.controller('reservationsController', ["$scope", "$http", function($scope, $http) {
  $scope.dates = []
  $http.get("/restaurant_reservations.json").success(function(data){
    $scope.reservations = data;
    for (var i = 0; i < data.length; i++) {
      if ($scope.dates.indexOf(data[i].date) == -1) {
        $scope.dates.push(data[i].date);
      }
    };
  });
}]);