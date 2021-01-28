// create the module and name it myapp
var myapp = angular.module("myapp", ["ngRoute"]);

// configure our routes
myapp
  .config(function ($routeProvider) {
    $routeProvider
      .when("/about", {
        templateUrl: "/challenge/pages/about.html",
        controller: "aboutController",
      })
      .when("/panel", {
        templateUrl: "/challenge/pages/panel.html",
        controller: "UserPanelController",
      })
      .when("/mix", {
        templateUrl: "/challenge/pages/mix.html",
        controller: "mixController",
      });
  }).directive('adminHiddenPanel', function() {
    return {
      templateUrl: "admin.html"
    }
  });

myapp.controller("mainController", ['$scope', '$window', function ($scope, $window) {

}]);

myapp.controller("aboutController", ['$scope', '$window', function ($scope, $window) {

  $scope.message = "Contact us at contact@cyberjutsu.io";
}]);

myapp.controller("mixController", ['$scope', '$window', function ($scope, $window) {
  $scope.$window = $window;
  if ($window.sessionStorage.getItem("sessionData") != null && $window.sessionStorage.getItem("sessionData").length > 0) {
    try {
      let session_ = $window.JSON.parse(sessionStorage.getItem("sessionData"));
      if (session_['name'].length > 0) {
        $scope.message = `Hello ${session_['name']}!`;
      }
    } catch{
      throw 'Error';
    }
  }
}]);

myapp.controller("UserPanelController", ['$scope', '$window', function ($scope, $window) {
  $scope.$window = $window;
  if ($window.sessionStorage.getItem("sessionData") != null && $window.sessionStorage.getItem("sessionData").length > 0) {
    try {
      let session_ = $window.JSON.parse(sessionStorage.getItem("sessionData"));
      if (session_['admin'] === true) {
        $scope.isAdmin = true;
      }
    } catch{
      throw 'Error'; 
    }
  }
}]);