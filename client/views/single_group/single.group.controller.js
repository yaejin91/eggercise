'use strict';

angular.module('eggercise')
  .controller('ShowGroupCtrl', ['$rootScope', '$location', '$log', '$routeParams', 'GroupService', 'Auth', 'DateService', 'SingleGroupService', function ($rootScope, $location, $log, $routeParams, GroupService, Auth, DateService, SingleGroupService) {
    var vm = this;

      vm.group = {};
      vm.authUserId = $rootScope.Auth.getUser()._id;
      vm.startDate;
      vm.endDate;
      vm.totaldays;
      vm.daysElapsed;
      vm.group_id = $routeParams.id;
      vm.exercises = [];
      vm.youOwe;
      vm.daysBehind;
      vm.daysAhead;
      vm.pot;

      angular.extend(vm, {

        name: 'ShowGroupCtrl',

        //show Group
        showGroup: function (id) {
          var test;
          GroupService.showGroup(id)
            .then(function (data) {
              vm.startDate = DateService.getFullDate(data.start);
              vm.endDate = DateService.getFullDate(data.end);
              vm.totaldays = DateService.daysBetween(data.start, data.end);
              vm.daysElapsed = SingleGroupService.elapsedDay(data.start, data.end);
              vm.exercises = SingleGroupService.membersExercises(data._members);
              vm.group = data;

              //Execute moneyOwed()
              vm.moneyOwed(id);

            })
            .catch(function (err) {
              vm.error = err;
              $log.error('Error: ', err);
            });
        },

        moneyOwed: function (id) {
          var user = Auth.getUser();
          var daysDifference;

          GroupService.showGroup(id)
            .then(function (data) {
              var leaderAndRunnerUpArray = [];
              data.you = user;
              var membersArray = SingleGroupService.membersValidExercises(data._members, vm.startDate, vm.endDate);
              leaderAndRunnerUpArray = SingleGroupService.assignLeader(membersArray, vm.startDate, vm.endDate);

              var winnersPot = SingleGroupService.potCalculation(membersArray, leaderAndRunnerUpArray[0], leaderAndRunnerUpArray[1], vm.group.bet);

              //Comparing current user to the leader of the group
              if(data.you.email == leaderAndRunnerUpArray[0].email) {
                daysDifference = leaderAndRunnerUpArray[0].exercises - leaderAndRunnerUpArray[1].exercises;
                vm.daysAhead = Math.abs(daysDifference);
                vm.youOwe = winnersPot;
              } else {
                  daysDifference = leaderAndRunnerUpArray[0].exercises - user.exercises.length;
                  vm.daysBehind = Math.abs(daysDifference);
                  vm.youOwe = Math.abs(daysDifference*vm.group.bet);
              }

              vm.group = data;

            })
            .catch(function (err) {
              vm.error = err;
              $log.error('Error: ', err);
            });
        }
      });
  }]);