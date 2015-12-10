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
      var id = '5669e40077cc88a84bbb5c13';
      var newDate = '12-31-2015';
      var existingUser = {
        _id: id,
        name: 'yaejintest3',
        email: 'yaejintest3@test.com',
        password: 'test',
        exercises: []
      };

      var updatedExerciseUser = {
        _id: id,
        name: 'yaejintest3',
        email: 'yaejintest3@test.com',
        password: 'test',
        exercises: [newDate];
      };

      $httpBackend.whenPOST(/log/)
        .respond (function (method, url, params) {
          // var re = /.*\/log/;
          if (newDate) {
            return [200, updatedExerciseUser];
          } else {
            return[404, { message: 'Not Found'}];
          }
        });

      // setup the service to use the success and error handler functions we defined in the beforeEach block.
      service.logworkout.then(handler.success, handler.error);
      
      // tests the results
      // expect(handler.success).toHaveBeenCalled();
      expect(newDate).toEqual(updatedExerciseUser.exercises[0]);
      expect(handler.error).not.toHaveBeenCalled();
      expect(errorMessage).toBeUndefined();
    })
  });
})();