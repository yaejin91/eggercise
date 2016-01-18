(function() {
  'use strict';

  describe('SingleGroupService', function () {
    var service, DateService, handler, singleGroupData, errorMessage, $log;

    //Configure module that contains the serivce being tested
    beforeEach(module('eggercise'));

    beforeEach(inject(function (_$log_, _SingleGroupService_, _DateService_) {
      $log = _$log_;
      service = _SingleGroupService_;
      DateService = _DateService_;
      singleGroupData = [];

      // Define an object with functions to handle success and error for our API calls
      // These functions simulate the functions written in controllers when a service is called
      handler = {
        success: function (singleGroup) {
          singleGroupData.push(singleGroup);
        },
        error: function (err) {
          errorMessage = err;
        }
      };

      // Use the Jasmine spyOn method to setup a callback using our handler mock object
      spyOn(handler, 'success').and.callThrough();
      spyOn(handler, 'error').and.callThrough();
    }));

    //Test service elapsedDay() 
    it('should return number of days elapsed between two dates', function () {
      var groupStartDate = new Date();
      var groupEndDate = new Date('2016-01-31T08:00:00.000Z');
      var numberOfDays = service.elapsedDay(groupStartDate, groupEndDate)
        
      expect(numberOfDays).toBeDefined();
    });

    //Test service elapsedDay() when group start date is later than today's date
    it('should return 0 for number of days elapsed', function () {
      var todayDate = new Date();
      var groupStartDate = new Date('2017-01-01T08:00:00.000Z');
      var groupEndDate = new Date('2017-01-31T08:00:00.000Z');
      var noDaysElapsed = service.elapsedDay(groupStartDate, groupEndDate)
    
        expect(noDaysElapsed).toBe(0);
    });

    
  })
})();