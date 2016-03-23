'use strict';

angular.module('diseaseOntology.diseaseView', ['ngRoute', 'ngSanitize'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/post/:postId', {
    templateUrl: 'posts/view/post_view.html',
    controller: 'diseaseViewCtrl'
  });
}])

.controller('diseaseViewCtrl', ['$rootScope', '$scope', 'cornercouch', '$routeParams', 'config', function($rootScope, $scope, cornercouch, $routeParams, config) {
  $scope.db = $rootScope.couch.getDB(config.db);
    $scope.disease = $scope.db.getDoc($routeParams.postId);
  console.log($scope.disease);
}]);
