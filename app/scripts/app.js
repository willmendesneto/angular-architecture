'use strict';

angular.module('AngularArchitectureApp', ['firebase', 'ngRoute', 'ngResource'])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $locationProvider.hashPrefix('!');

    $routeProvider
      //  Error route
      .when('/error/:type', {
          templateUrl: function(req) {
              return 'views/error/' + req.type + '.html';
          }
      })
      //  Default call
      //  RETRIEVE
      .when('/:section', {
          templateUrl: function(req) {
              return 'views/' + req.section + '/list.html';
          },
          controller: function(req) {
              var str = '-' + req.section,
                  controller = str.replace(/[-_]([a-z])/g, function (m, w) {
                  return w.toUpperCase();
              }) + 'Ctrl';
              return controller;
          },
          autoRoute: true
      })

      //  CREATE
      .when('/:section/new', {
          templateUrl: function(req) {
              return 'views/' + req.section + '/add.html';
          },
          controller: function(req) {
              var str = '-' + req.section,
                  controller = str.replace(/[-_]([a-z])/g, function (m, w) {
                  return w.toUpperCase();
              }) + 'Ctrl';
              return controller;
          },
          autoRoute: true
      })
      //  UPDATE
      .when('/:section/:id/edit', {
          templateUrl: function(req) {
              return 'views/' + req.section + '/edit.html';
          },
          controller: function(req) {
              var str = '-' + req.section,
                  controller = str.replace(/[-_]([a-z])/g, function (m, w) {
                  return w.toUpperCase();
              }) + 'Ctrl';
              return controller;
          },
          method: 'edit',
          autoRoute: true
      })
       //  Default call

      .otherwise({ redirectTo: '/error/404' });
  }]);
