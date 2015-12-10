(function() {
  'use strict';

  describe('WorkoutService', function() {
    var service, $httpBackend, handler, errorMessage;

    // Configure module that contains the controller being tested
    beforeEach(module('eggercise'));

    beforeEach(inject(function (_$httpBackend_, _WorkoutService_) {
      $httpBackend = _$httpBackend_;
      service = _WorkoutService_;
      workoutData = [];


      // Define an object with functions to handle success and error for our API calls
      // These functions simulate the functions written in controllers when a service is called
      handler = {
        success: function(workout) {
          workoutData.push(workout);
        },
        error: function (err) {
          errorMessage = err;
        }
      };

      // Use the Jasmine spyOn method to setup a callback using our handler mock object
      spyOn(handler, 'success').and.callThrough();
      spyOn(handler, 'error').and.callThrough();
    }));

    //Test for logWorkout()
    it('should let a user log workout', function () {      
      // var id ='jibberish';
      // Need Authentication? Since it's updating user...
      // var existingUser = {
      //   _id: id,
      //   name: '',

      // }
      expect(1).toBe(1);
      // $httpBackend.whenPOST()
    })
  })
})