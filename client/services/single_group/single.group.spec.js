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
      //Change the date two weeks ago into milliseconds
      var groupStartDate = DateService.dateToMilli(new Date() - 1209600000);
      //Set group end date to today (in milliseconds)
      var groupEndDate = DateService.dateToMilli(new Date());
      var numberOfDays = service.elapsedDay(groupStartDate, groupEndDate);
        
      expect(numberOfDays).toBe(14);
    });

    //Test service elapsedDay() when group start date is later than today's date
    it('should return 0 for number of days elapsed', function () {
      var todayDate = DateService.dateToMilli(new Date());
      //set group start date to 2 weeks from today
      var groupStartDate = todayDate + 1209600000;
      //set group end date to 2 weeks from group start date
      var groupEndDate = groupStartDate + 1209600000;
      var noDaysElapsed = service.elapsedDay(groupStartDate, groupEndDate)
    
      expect(noDaysElapsed).toBe(0);
    });

    //Test membersExercises()
    // it('should ')

    
  })
})();