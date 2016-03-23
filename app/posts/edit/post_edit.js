'use strict';

angular.module('sabot.postEdit', ['ngRoute', 'ngSanitize', 'textAngular'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/post/:postId/edit', {
    templateUrl: 'posts/edit/post_edit.html',
    controller: 'postEditCtrl'
  });
}])

.controller('postEditCtrl', ['$rootScope', '$scope', 'cornercouch', '$routeParams', 'config', function($rootScope, $scope, cornercouch, $routeParams, config) {
  $scope.db = $rootScope.couch.getDB(config.db);

  if ($routeParams.postId === 'new') {
    $scope.post = $scope.db.newDoc({date: new Date()});
    // Still need to find effective sales tax - example query:
    // http://localhost:5984/sabot/_design/sabot/_view/taxes?limit=1&reduce=false&descending=true&startkey="2016-03-18"
  } else {
    $scope.post = $scope.db.getDoc($routeParams.postId);
  }
  console.log($scope.post);

  $scope.savePost = function() {
    $scope.post.save().success(function() {
      console.log($scope.post);
    });
  };
}]);
