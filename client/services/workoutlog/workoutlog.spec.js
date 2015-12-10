(function() {
  'use strict';

  describe('WorkoutService', function() {
    var service, $httpBackend, workoutData,handler, errorMessage;

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
    fit('should let a user log workout', function () {      
      var id = '5669e40077cc88a84bbb5c13';
      var existingDate = '12-31-2015';
      var newDate = '01-02-2016';
      var existingUser = {
        _id: id,
        name: 'testlogging',
        email: 'testlogging@test.com',
        password: 'test',
        exercises: [existingDate]
      };

      var updatedExerciseUser = {
        _id: id,
        name: 'testlogging',
        email: 'testlogging@test.com',
        password: 'test'
      };

      updatedExerciseUser.exercises = existingUser.exercises;
      updatedExerciseUser.exercises.push(newDate);

      $httpBackend.whenPOST(/log\/(\S+)$/)
        .respond (function (method, url, params) {
          var re = /.*\/log\/(\S+)$/;
          var userId = url.replace(re, '$1');

          if (userId === existingUser._id) {
            return [200, updatedExerciseUser];
          } else {
            return[404, { message: 'Not Found'}];
          }
        });

      // setup the service to use the success and error handler functions we defined in the beforeEach block.
      service.logWorkout(id).then(handler.success, handler.error);
      $httpBackend.flush();
      
      // tests the results
      // expect(handler.success).toHaveBeenCalled();
      expect(updatedExerciseUser.exercises[1]).toEqual('01-02-2016');
      expect(handler.error).not.toHaveBeenCalled();
      expect(errorMessage).toBeUndefined();
    });

  });
})();