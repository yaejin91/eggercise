'use strict';

angular.module('eggercise')
  .service('SingleGroupService', ['DateService', 'Auth', function (DateService, Auth) {
    var service = {};
    
    service.elapsedDay = function (startDate, endDate) {
      var daysElapsed;
      var todayDate = DateService.dateToMilli(new Date());
      var convertedStartDate = DateService.dateToMilli(startDate);

      if (todayDate < convertedStartDate) {
        daysElapsed = 0;
      } else {
        daysElapsed = DateService.daysBetween(convertedStartDate, todayDate)
      }
      return daysElapsed;
    };

    service.membersValidExercises = function (membersArray, startDate, endDate) {
      var startDate_ms = DateService.dateToMilli(startDate);
      var endDate_ms = DateService.dateToMilli(endDate);

      for (var i = 0; i < membersArray.length; i++) {
        var validExercises = [];
        for (var j = 0; j < membersArray[i].exercises.length; j++) {
          //each member's separate log entries changed into milliseconds unit
          var logInMilli = DateService.dateToMilli(membersArray[i].exercises[j]);

          //if log is in between start and end date of the group, push to array
          if ((logInMilli >= startDate_ms) && (logInMilli <= endDate_ms)){
            validExercises.push(membersArray[i].exercises[j]);
          }
        }
        membersArray[i].validExercises = validExercises;
      }
      //membersArray[i] now have array validExercises as one of its properties
      return membersArray;
    };

    service.assignLeader = function (membersArray, startDate, endDate) {
      var leaderAndRunnerUp = [];
      var leader = {email: 'leader@test.com', exercises: -1, validExercisesLength: -1};
      var runnerUp = {email: 'runnerUp@test.com', exercises: -2, validExercisesLength: -2};

      for (var i = 0; i < membersArray.length; i++) {
        membersArray[i].validExercises;
        //if user has the most exercises, his/her email is set as the group's leader's email
        //the leader's number of exercises is also in this object
        if (membersArray[i].validExercises.length > leader.exercises) {
          //put old leader in runnerUp (runnerUp overthrows leader)
          runnerUp.email = leader.email;
          runnerUp.exercises = leader.exercises;
          runnerUp.validExercisesLength = leader.validExercisesLength;

          //assign new leader
          leader.email = membersArray[i].email;
          leader.exercises = membersArray[i].validExercises.length;
          leader.validExercisesLength = membersArray[i].validExercises.length
          //assign new runnerUp
        } else if(membersArray[i].validExercises.length > runnerUp.exercises) {
          runnerUp.email = membersArray[i].email;
          runnerUp.exercises = membersArray[i].validExercises.length;
          runnerUp.validExercisesLength = membersArray[i].validExercises.length
        }
      }
      leaderAndRunnerUp = [leader, runnerUp];
      return leaderAndRunnerUp;
    };

    service.potCalculation = function (membersArray, leader, runnerUp, groupBet) {
      var winnersPot = 0;
      var winnersIndex = 0;

      for (var i = 0; i < membersArray.length; i++) {
        //Comparing each user to the leader of the group
        if(membersArray[i].email == leader.email) {
          membersArray[i].daysAhead = Math.abs(leader.validExercisesLength - runnerUp.validExercisesLength);
          winnersIndex = i;
        } else {
          membersArray[i].daysBehind = Math.abs(leader.validExercisesLength - membersArray[i].validExercises.length);
          membersArray[i].memberOwes = Math.abs(membersArray[i].daysBehind*groupBet);
          winnersPot = winnersPot + membersArray[i].memberOwes;
        }
      }
      return winnersPot;
    };

    service.youWinOrOwe = function (winnersPot, leader, runnerUp, groupBet, startDate, endDate) {
      var you = [Auth.getUser()];
      var resultObject = {};
      var owe;
      var daysDifference;
      var youWithValidExercises = service.membersValidExercises(you, startDate, endDate);

      if(you[0].email == leader.email) {
        if(runnerUp.validExercisesLength >= 0) {
          daysDifference = leader.validExercisesLength - runnerUp.validExercisesLength;
          owe = winnersPot;
          resultObject = {days: daysDifference, money: winnersPot};   
        } else {
          daysDifference = 0;
          owe = winnersPot;
          resultObject= {days: daysDifference, money: winnersPot};
        }
      } else {
        daysDifference = youWithValidExercises[0].validExercises.length - leader.validExercisesLength;
        owe = daysDifference * groupBet;
        resultObject = {days: daysDifference, money: owe};
      }
      return resultObject;
    };

    return service;

  }]);