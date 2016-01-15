'use strict';

angular.module('eggercise')
  .service('DateService', function () {
    var service = {};

    service.millisToDays = function (date) {
      //multiplier for milliseconds to days conversion 
      var conversionConst = 1000*60*60*24;

      //date in milliseconds
      var dateToMilli = new Date(date)

      //date in milliseconds to number of days
      var convertedDate = Math.floor(dateToMilli/conversionConst);

      return convertedDate;

    };

    service.dateToMilli = function (date) {
      var convertedDate = new Date(date).getTime();
      return convertedDate;
    }

    //This service is for extracting month and date from the given date format.
    //date = data.start or data.end
    service.getMonthAndDate = function (date) {
      // var 
    }
    
    return service;
  });