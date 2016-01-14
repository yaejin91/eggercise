(function() {
  'use strict';

  describe('WorkoutService', function() {
    var service, $httpBackend, workoutData,handler, errorMessage, $log;
    
    // Configure module that contains the controller being tested
    beforeEach(module('eggercise'));

    beforeEach(inject(function (_$log_, _$httpBackend_, _WorkoutService_) {
      $log = _$log_;
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

    //Test service.showWorkout()
    it('should show all of users workout log', function () {
      var response = service.showWorkout()
        .then(function () {
          $log.info('Success!');
        })
        .catch(function (err) {
          $log.error('Error: ', err);
        });

      expect(response).toBeTruthy();
    });

    //Test service.setlogPath() when we want logPath = 'log'
    it('should set logPath to log', function () {
      var fakeWorkouts = [
      {date: 'Wed Jan 13 2016', checked: false}, 
      {date: 'Tue Jan 12 2016', checked: false}];
      var index = 0;

      for(var i = 0; i < fakeWorkouts.length; i++) {
        fakeWorkouts[i].checked = true;
        index = i;
      }
      var response = service.setlogPath(index, fakeWorkouts);
      expect(response).toBe('log');
    });

    //Test service.setlogPath() when we want logPath = 'unlog'
    fit('should set logPath to unlog', function () {
      var fakeWorkouts = [
      {date: 'Mon Jan 11 2016', checked: true}, 
      {date: 'Tue Jan 12 2016', checked: true}];
      var index = 0;

      for(var i = 0; i < fakeWorkouts.length; i++) {
        fakeWorkouts[i].checked = false;
        index = i;
      }
      var response = service.setlogPath(index, fakeWorkouts);
      expect(response).toBe('unlog');
    });

  });
})();
