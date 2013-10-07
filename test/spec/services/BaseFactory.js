'use strict';

describe('Service: BaseFactory', function () {

  // load the service's module
  beforeEach(module('AngularArchitectureApp'));

  // instantiate service
  var BaseFactory;
  beforeEach(inject(function (_BaseFactory_) {
    BaseFactory = _BaseFactory_;
  }));

  it('should do something', function () {
    expect(!!BaseFactory).toBe(true);
  });

});
