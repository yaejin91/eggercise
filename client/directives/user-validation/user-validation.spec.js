'use strict';

describe('User-Validation', function () {

  beforeEach(module('eggercise'));

  var element, scope;

  beforeEach(inject(function ($compile, $rootScope){
    scope = $rootScope;
    element = angular.element();
    $compile(element)(scope);
    scope.$apply();
  }));

  it('should ...', function() {
    expect(1).toBe(1);
  });
});