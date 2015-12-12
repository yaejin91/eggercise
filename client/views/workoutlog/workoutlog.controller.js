'use strict';

angular.module('eggercise')
  .controller('WorkoutCtrl', ['WorkoutService', '$routeParams', '$rootScope', '$log', '$location', function (WorkoutService, $routeParams, $rootScope, $log, $location) {

    var vm = this;
    vm.user = {};
    vm.formData = {};
    vm.id = $rootScope._id;

    angular.extend(vm, {

    //Show Workout
    showWorkout: function () {
      WorkoutService.showWorkout()
        .then(function (data) {
          vm.user = data;
          console.log('vm.user in workoutlog controller: ', vm.user);
          $location.path('/log');
        })
        .catch(function (err) {
          vm.error = err;
          $log.error('Error: ',err);
        })
    },

    //Log Workout
    logWorkout: function () {
      WorkoutService.logWorkout(vm.formData)
        .then(function (data) {
          vm.user = data;
          $location.path('/log');
        })
        .catch(function (err) {
          vm.error = err;
          $log.error('Error: ', err);
        })
    },

    //Unlog Workout
    unlogWorkout: function() {
      WorkoutService.unlogWorkout(vm.formData)
        .then(function (data) {
          vm.user = data;
          $location.path('/log');
        })
        .catch(function (err) {
          vm.error = err;
          $log.error('Error: ', err);
        })
    }

   });
  }]);