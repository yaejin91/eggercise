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
      vm.days;
      vm.daysBehind;
      vm.pot;
      console.log(vm);

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
          var runnerUp;

          GroupService.showGroup(id)
            .then(function (data) {
              data.you = user;
              data.leader = {email: 'leader@test.com', exercises: -1};

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
                //if user has the most exercises, his/her email is set as the group's leader's email
                //the leader's number of exercises is also in this object
                if(data._members[i].validExercises.length > data.leader.exercises) {
                  data.leader.email = data._members[i].email;
                  data.leader.exercises = data._members[i].validExercises.length;
                }
              }
              daysDifference = data.leader.exercises - user.exercises.length + 1;
              vm.youOwe = Math.abs(daysDifference*vm.group.bet);

              //Comparing current user to the leader of the group through e-mail
              if(data.you.email == data.leader.email) {
                vm.daysAhead = Math.abs(daysDifference);
                vm.pot = 'Wins ' + vm.youOwe;
              } else {
                daysDifference = data.leader.exercises - user.exercises.length + 1;
                vm.daysBehind = Math.abs(daysDifference);
                vm.pot = 'Pays ' + vm.youOwe;
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