'use strict';

// Declare app level module which depends on views, and components
angular.module('sabot', [
  'ngRoute',
  'sabot.postList',
  'sabot.postView',
  'sabot.postEdit',
  'CornerCouch'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]).
run(function($rootScope, cornercouch){
  $rootScope.couch = cornercouch();
  $rootScope.couch.session();
  $rootScope.dbName = '';
});

var Config = {
    'db': 'sabot'
};

angular.module('sabot').constant('config', Config);
