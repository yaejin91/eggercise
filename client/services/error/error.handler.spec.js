(function() {
  'use strict';

  describe('ErrorService', function () {
    var service, handler, errorData, mockToasty;

    beforeEach(module('eggercise'));

    beforeEach(function() {
      mockToasty = {
        error: function (err) {
          return err.msg;
        }
      };

      module(function ($provide) {
        $provide.value('toasty', mockToasty);
      });
    });

    beforeEach(inject(function (_ErrorService_){
      service = _ErrorService_;
      errorData = [];
    }));

    it('should return an error through toasty', function () {
      var response = service.errorToasty('Error Message!!!');
      expect(response).toBe('Error: Error Message!!!');
    });
  })
})();