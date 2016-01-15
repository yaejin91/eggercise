'use strict';

angular.module('eggercise')
  .service('LeaderService', ['DateService', function (DateService) {
    var service = {};

    //membersArray = data._members.length
    //leader = data.leader
    //startDate = vm.sdate
    //endDate = vm.edte
    service.setLeader = function (membersArray, leader, startDate, endDate) {
      for(var i = 0; i < membersArray.length; i++) {
        membersArray.validExercises = [];
        for(var j = 0; j < membersArray[i].exercises.length; j++){
          //each member's separate log entries changed into milliseconds unit
          var logInMilli = DateService.dateToMilli(membersArray[i].exercises[j]);

          //if log is in between start and end date of the group, push to array
          if((logInMilli >= startDate) && (logInMilli <= endDate)){
            membersArray[i].validExercises.push(membersArray[i].exercises[j])
          }
        }
        //if user has the most exercises, his/her email is set as the group's leader's email
        //the leader's number of exercises is also in this object
        // if(membersArray[i].validExercises.length > )
      }
    };

    return service;
  }]);