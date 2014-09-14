app.controller('carouselCtrl', ["$scope", "$http", function($scope, $http) {
  $http.get("/images.json").success(function(data){
    $scope.pictures = data;
    $scope.picture = $scope.pictures[0]
  });
  $scope.myInterval = 5000;
  $scope.cycleImages = function(){
    var length = $scope.pictures.length
    var number = Math.round((length-1)*Math.random());
    $scope.picture = $scope.pictures[number]
    console.log(number)
    console.log(length)
  }
}]);