'use strict';

describe('Service: baseService', function () {

  // load the service's module
  beforeEach(module('AngularArchitectureApp'));

  // instantiate service
  var baseService;
  beforeEach(inject(function (_baseService_) {
    baseService = _baseService_;
  }));

  it('should do something', function () {
    //expect(!!baseService).toBe(true);
  });

});
