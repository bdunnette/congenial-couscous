'use strict';

angular.module('diseaseOntology.diseaseList', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    name: 'diseaseList',
    templateUrl: 'disease/list/disease_list.html',
    controller: 'diseaseListCtrl'
  });
}])

.controller('diseaseListCtrl', ['$rootScope', '$scope', 'cornercouch', 'config', function($rootScope, $scope, cornercouch, config) {
  $scope.db = $rootScope.couch.getDB(config.db);

  $scope.db.query("diseaseOntology", "diseases", {
    include_docs: true,
    descending: true,
    limit: 10
  });
}]);
