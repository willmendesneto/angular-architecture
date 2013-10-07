'use strict';

angular.module('AngularArchitectureApp', ['firebase', 'ngRoute', 'chieffancypants.loadingBar', 'ngResource'])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  //$locationProvider
    //.html5Mode(true)
    //.hashPrefix('!');

    $routeProvider
      //  Default call
      .when('/:section', {
          templateUrl: function(req) {
              req.section = req.section || 'base';
              return 'views/' + req.section + '.html';
          },
          controller: function(req) {
              req.section = req.section || 'base';
              var str = '-' + req.section,
                  controller = str.replace(/[-_]([a-z])/g, function (m, w) {
                  return w.toUpperCase();
              }) + 'Ctrl';
              return controller;
          }
      });
  }]);
