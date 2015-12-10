'use strict';

angular.module('eggercise')
  .controller('WorkoutCtrl', function (WorkoutService, $routeParams, $rootScope, $log, $location) {

    var vm = this;
    vm.user = {};
    vm.formData = {};
    vm.id = $rootScope._id;

    angular.extend(vm, {

    //Log Workout
    // logWorkout: function () {
    //   WorkoutService.logWorkout(vm.formData)
    //     .then(function (data) {
    //       vm.user = data;
    //       $location.path('/');
    //     })
    //   .catch(function (err) {
    //     vm.error = err;
    //     $log.error('Error: ', err);
    //   });
    // }
   });
});