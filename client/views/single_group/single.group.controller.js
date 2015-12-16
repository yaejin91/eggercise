'use strict';

angular.module('eggercise')
  .controller('ShowGroupCtrl', ['$location', '$log', '$routeParams', 'GroupService', 'Auth', function ($location, $log, $routeParams, GroupService, Auth) {
    var vm = this;

      vm.group = {};
      vm.startdate = {};
      vm.enddate = {};
      vm.totaldays = {};
      vm.elapsedday = {};
      vm.group_id = $routeParams.id;
      vm.members = [];
      vm.exercises = [];
      vm.sdate_ms;
      vm.edate_ms;
      vm.youOwe;
      vm.daysBehind;
      vm.pot;

      angular.extend(vm, {

        name: 'ShowGroupCtrl',

        //show Group
        showGroup: function (id) {
          GroupService.showGroup(id)
            .then(function (data) {
              var sdate = new Date(data.start);
              vm.startdate = ((sdate.getMonth() + 1) + "/" + sdate.getDate());
              var edate = new Date(data.end);
              vm.enddate = ((edate.getMonth() + 1) + "/" + edate.getDate());
              Date.daysBetween = function (sdate, edate) {
                var one_day = 1000 * 60 * 60 * 24;
                vm.sdate_ms = sdate.getTime();
                vm.edate_ms = edate.getTime();
                var difference_ms = vm.edate_ms - vm.sdate_ms;
                return Math.round(difference_ms/one_day);
              }
              var tdate = new Date();
              vm.totaldays = Date.daysBetween(sdate, edate);
              vm.elapsedday = Date.daysBetween(sdate, tdate);
              vm.group = data;

              for (var i = 0; i < data._members.length; i++) {
                vm.members.push(data._members[i]);
                for (var j = 0; j < data._members[i].exercises.length; j++) {
                  if (data._members[i].exercises[j] === 0) {
                    j++;
                  }
                  vm.exercises.push(data._members[i].exercises[j]);
                }
              }
              $location.path('/group/show');
            })
            .catch(function (err) {
              vm.error = err;
              $log.error('Error: ', err);
            });
        },

        moneyOwed: function (id) {
          var user = Auth.getUser();
          GroupService.showGroup(id)
            .then(function (data) {
              data.you = user;
              data.leader = {email: 'leader@test.com', workouts: -1};
              for (var i = 0; i < data._members.length; i++) {
                data._members[i].validExercises = [];
                for(var j = 0; j < data._members[i].exercises.length; j++) {
                  //each member's separate log entries changed into milliseconds unit
                  var logInMilli = new Date(data._members[i].exercises[j]).getTime();
                  //if log is in between start and end date of the group, push to array
                  if((logInMilli > vm.sdate_ms) && (logInMilli < vm.edate_ms)) {
                    data._members[i].validExercises.push(data._members[i].exercises[j]);
                  }
                } 
                //if user has the most workout, his/her email is set as the group's leader's email
                //the leader's number of workouts is also in this object
                if(data._members[i].validExercises.length > data.leader.workouts) {
                  data.leader.email = data._members[i].email;
                  data.leader.workouts = data._members[i].validExercises.length;
                  vm.daysBehind = data.leader.workouts - user.exercises.length;
                  vm.pot = vm.daysBehind*vm.group.bet
                  vm.youOwe = Math.abs(vm.pot);
                }
              }
              vm.group = data;

              if(vm.daysBehind > 0) {
                vm.pot = 'Pays ' + vm.youOwe;
              }else {
                vm.pot = 'Wins ' + vm.youOwe;
              }  
            })
            .catch(function (err) {
              vm.error = err;
              $log.error('Error: ', err);
            });
        }
      });
  }]);