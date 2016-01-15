'use strict';

angular.module('eggercise')
  .service('SingleGroupService', ['DateService', function (DateService) {
    var service = {};

    service.elapsedDay = function (startDate, endDate) {
      var daysElapsed;
      var startDateConverted = new Date(startDate);
      var endDateConverted = new Date(endDate);
      var todayDate = new Date();
      if(todayDate < startDate) {
        daysElapsed = 0;
      } else {
        daysElapsed = DateService.daysBetween(startDate, todayDate)
      }
      return daysElapsed;
    };

    service.membersExercises = function(membersArray) {
      var allMembersExercises = [];
      var allMembers = [];

      for (var i = 0; i < membersArray.length; i++) {
        for (var j = 0; j < membersArray[i].exercises.length; j++) {
          if (membersArray[i].exercises[j] === 0) {
            j++;
          }
          allMembersExercises.push(membersArray[i].exercises[j]);
        }
      }
      return allMembersExercises;
    };

    return service;

  }]);