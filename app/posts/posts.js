'use strict';

angular.module('sabot.postList', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    name: 'postList',
    templateUrl: 'posts/posts.html',
    controller: 'postListCtrl'
  });
}])

.controller('postListCtrl', ['$rootScope', '$scope', 'cornercouch', 'config', function($rootScope, $scope, cornercouch, config) {
  $scope.db = $rootScope.couch.getDB(config.db);

  $scope.db.query("sabot", "posts", {
    include_docs: true,
    descending: true,
    limit: 10
  });
}]);
