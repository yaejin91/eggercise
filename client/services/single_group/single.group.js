'use strict';

angular.module('eggercise')
  .service('SingleGroupService', ['DateService', 'Auth', function (DateService, Auth) {
    var service = {};

    service.elapsedDay = function (startDate, endDate) {
      var daysElapsed;
      var todayDate = new Date();

      if (todayDate < startDate) {
        daysElapsed = 0;
      } else {
        daysElapsed = DateService.daysBetween(startDate, todayDate)
      }
      return daysElapsed;
    };

    service.membersExercises = function (membersArray) {
      var allMembersExercises = [];

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

    //membersArray = data._members
    service.membersValidExercises = function (membersArray, startDate, endDate) {
      var startDate_ms = DateService.dateToMilli(startDate);
      var endDate_ms = DateService.dateToMilli(endDate);

      for (var i = 0; i < membersArray.length; i++) {
        membersArray[i].validExercises = [];
        for (var j = 0; j < membersArray[i].exercises.length; j++) {
          //each member's separate log entries changed into milliseconds unit
          var logInMilli = DateService.dateToMilli(membersArray[i].exercises[j]);

          //if log is in between start and end date of the group, push to array
          if ((logInMilli >= startDate_ms) && (logInMilli <= endDate_ms)){
            membersArray[i].validExercises.push(membersArray[i].exercises[j]);
            // console.log('logInMilli is valid');
          }
        }
      }
      //membersArray[i] now have array validExercises
      // console.log('validExercises: ', membersArray[0].validExercises);
      console.log('membersArray on Services: ', membersArray);
      return membersArray;
    };

    //membersArray = data._members
    //leader = data.leader
    //runnerUp = data.runnerUp
    service.assignLeader = function (membersArray, startDate, endDate) {
      var membersArray = service.membersValidExercises(membersArray, startDate, endDate)
      var leaderAndRunnerUp = [];
      var leader = {email: 'leader@test.com', exercises: 0};
      var runnerUp = {email: 'runnerUp@test.com', exercises: 0};

      for (var i = 0; i < membersArray.length; i++) {
        membersArray[i].validExercises;
        //if user has the most exercises, his/her email is set as the group's leader's email
        //the leader's number of exercises is also in this object
        if (membersArray[i].validExercises.length > leader.exercises) {
          //put old leader in runnerUp (runnerUp overthrows leader)
          runnerUp.email = leader.email;
          runnerUp.exercises = leader.exercises;

          //assign new leader
          leader.email = membersArray[i].email;
          leader.exercises = membersArray[i].validExercises.length;
          //assign new runnerUp
        } else if(membersArray[i].validExercises.length > runnerUp.exercises) {
          runnerUp.email = membersArray[i].email;
          runnerUp.exercises = membersArray[i].validExercises.length;
        }
      }
      leaderAndRunnerUp = [leader, runnerUp];
      return leaderAndRunnerUp;
    };

    //membersArray = data._members
    //leader = data.leader
    //runnerUp = data.runnerUp
    //groupBet = vm.group.bet
    service.potCalculation = function (membersArray, leader, runnerUp, groupBet) {
      var leaderAndRunnerUp = service.assignLeader(membersArray, leader, runnerUp);
      var leader = leaderAndRunnerUp[0];
      var runnerUp = leaderAndRunnerUp[1];
      var winnersPot = 0;
      var winnersIndex = 0;

      for (var i = 0; i < membersArray.length; i++) {
        //Comparing each user to the leader of the group
        if(membersArray[i].email == leader.email) {
          membersArray[i].daysAhead = Math.abs(leader.exercises - runnerUp.exercises);
          winnersIndex = i;
        } else {
          membersArray[i].daysBehind = Math.abs(leader.exercises - membersArray[i].exercises.length);
          membersArray[i].memberOwes = Math.abs(membersArray[i].daysBehind*groupBet);
          winnersPot = winnersPot + membersArray[i].memberOwes;
        }
      }
      membersArray[winnersIndex].memberOwes = winnersPot;
      return membersArray[winnersIndex].memberOwes;
    };

    //daysDifference = vm.daysAhead/vm.daysBehind
    //owe = vm.youOwe
    //groupBet = vm.group.bet
    //winnersPot = winnersPot
    service.youWinOrOwe = function (daysDifference, owe, groupBet, winnersPot) {
      var you = Auth.getUser();
      var leaderAndRunnerUp = service.assignLeader(membersArray);
      var currentLeader = leaderAndRunnerUp[0];
      var currentRunnerUp = leaderAndRunnerUp[1];
      var resultObject = {};

      if(you.email == currentLeader.email) {
        daysDifference = Math.abs(currentLeader.exercises - currentRunnerUp.exercises);
        owe = winnersPot;
        resultObject = {aheadBy: daysDifference, win: winnerPot};
      } else {
        daysDifference = Math.abs(currentLeader.exercises - you.exercises.length);
        owe = Math.abs(daysDiffernce * groupBet);
        resultObject = {behindBy: daysDifference, lose: owe};
      }
      return resultObject;
    }

    return service;

  }]);