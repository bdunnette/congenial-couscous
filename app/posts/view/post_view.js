'use strict';

angular.module('sabot.postView', ['ngRoute', 'ngSanitize'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/post/:postId', {
    templateUrl: 'posts/view/post_view.html',
    controller: 'postViewCtrl'
  });
}])

.controller('postViewCtrl', ['$rootScope', '$scope', 'cornercouch', '$routeParams', 'config', function($rootScope, $scope, cornercouch, $routeParams, config) {
  $scope.db = $rootScope.couch.getDB(config.db);
    $scope.post = $scope.db.getDoc($routeParams.postId);
  console.log($scope.post);
}]);
