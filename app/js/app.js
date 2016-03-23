'use strict';

// Declare app level module which depends on views, and components
angular.module('diseaseOntology', [
  'ngRoute',
  'diseaseOntology.diseaseList',
  'diseaseOntology.diseaseView',
  'CornerCouch'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({
    redirectTo: '/'
  });
}]).
run(function($rootScope, cornercouch) {
  $rootScope.couch = cornercouch();
  $rootScope.couch.session();
  $rootScope.dbName = '';
});

var Config = {
  'db': 'do'
};

angular.module('diseaseOntology').constant('config', Config);
