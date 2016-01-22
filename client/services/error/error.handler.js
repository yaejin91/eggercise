'use strict';

angular.module('eggercise')
  .service('ErrorService', ['toasty', function (toasty) {
    var service = {};

    service.errorToasty = function (message) {
      return toasty.error({
        title: 'Failure',
        msg: 'Error: ' + message,
        theme: 'material'
      });
    };

    return service;
  }]);