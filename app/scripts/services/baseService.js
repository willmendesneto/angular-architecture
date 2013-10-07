'use strict';

angular.module('AngularArchitectureApp')
  .service('BaseService', function BaseService(BaseFactory, angularFire) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.BaseFactory = BaseFactory;
    this.angularFire = angularFire;

  });