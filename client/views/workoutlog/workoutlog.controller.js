'use strict';

angular.module('eggercise')
  .controller('WorkoutCtrl', ['WorkoutService', '$routeParams', '$rootScope', '$log', '$location', function (WorkoutService, $routeParams, $rootScope, $log, $location) {

    var vm = this;
    vm.user = {};
    vm.formData = {};
    vm.id = $rootScope._id;
    vm.allDates = [];
    vm.numberOfDays = 0;
    vm.checkBox = [];
    vm.allGroups = [];
    vm.firstStartDate = 99999999999999;

    angular.extend(vm, {

    //Show dates that you worked out and ones you didn't (from your join date)
    showWorkout: function () {
      WorkoutService.showWorkout()
        .then(function (data) {
          //Refactor this
          var joinDate = WorkoutService.millisToDays(data.joinDate);
          var todayDate = WorkoutService.millisToDays(Date.now());
          var firstStartDate = WorkoutService.setStartDate(data._groups,vm.firstStartDate);
          //vm.numberOfDays is number of days between user's groups' earliest log date and current date
          vm.numberOfDays = WorkoutService.numberOfDays(todayDate, joinDate, firstStartDate);
          vm.user = data;
          vm.allDates = WorkoutService.readableDates(vm.user.exercises, vm.numberOfDays, todayDate);
          $location.path('/log');
        })
        .catch(function (err) {
          vm.error = err;
          $log.error('Error: ',err);
        })
      },

      // showWorkout: function () {
      //   WorkoutService.showWorkout()
      //     .then(function (data) {
      //       vm.firstStartDate = WorkoutService.setStartDate(data._groups, vm.firstStartDate);
      //       //vm.numberOfDays is number of days between user's groups' earliest log date and current date
      //       vm.numberOfDays = WorkoutService.numberOfDays(data.joinDate, vm.firstStartDate);
      //       vm.user = data;
      //       vm.allDates = WorkoutService.readableDates(vm.user.exercises, vm.numberOfDays, todayDate);
      //       $location.path('/log');
      //     })
      //     .catch(function (err) {
      //       vm.error = err;
      //       $log.error('Error: ',err);
      //     })
      //   },

    //Log Toggle
    logToggle: function(index, date) {
      var logPath;

      if(vm.allDates[index].checked === true) {
        logPath = 'log';
      } else {
        logPath = 'unlog';
      }

      WorkoutService.logToggle(logPath, date)
        .then(function (data) {
          vm.user = data;
        })
        .catch(function (err) {
          vm.error = err;
          $log.error('Error: ', err);
        })
    }

   });
  }]);
