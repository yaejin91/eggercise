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

    //Test membersValidExercises()
    //when member's exercises are within startDate and endDate
    it('should add members exercises into validExercises array', function () {
      var groupStartDate = DateService.dateToMilli(new Date()) - 1209600000;
      var groupEndDate = DateService.dateToMilli(new Date()) + 1209600000;
      var exerciseDates = [
        '2016-01-14T08:00:00.000Z',
        '2016-01-15T08:00:00.000Z',
        '2016-01-16T08:00:00.000Z'
      ];
      var fakeMemberArray = [{name: 'potato', exercises: exerciseDates}];

      var response = service.membersValidExercises(fakeMemberArray, groupStartDate, groupEndDate);
      expect(response[0].validExercises).toBeDefined();
    });

    //Test membersValidExercises()
    //when one of member's exercises are not within startDate and endDate
    fit('should add members exercises into validExercises array', function () {
      var groupStartDate = DateService.dateToMilli(new Date()) - 1209600000;
      var groupEndDate = DateService.dateToMilli(new Date()) + 1209600000;
      var exerciseDates = [
        '2015-01-14T08:00:00.000Z',
        '2016-01-15T08:00:00.000Z',
        '2016-01-16T08:00:00.000Z'
      ];
      var fakeMemberArray = [{name: 'potato', exercises: exerciseDates}];

      var response = service.membersValidExercises(fakeMemberArray, groupStartDate, groupEndDate);
      expect(response[0].validExercises.length).toBe(2);
    });
    
  })
})();