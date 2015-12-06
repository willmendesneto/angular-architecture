'use strict';

angular.module('AngularArchitectureApp')
  .service('BaseService', function BaseService(BaseFactory, $firebaseArray) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.BaseFactory = BaseFactory;
    this.angularFire = $firebaseArray;

  });
