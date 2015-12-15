'use strict';

angular.module('eggercise')
  .service('WorkoutService', function ($rootScope, $q, $http) {
    var service = {};

    service.showWorkout = function () {
      var deferred = $q.defer();
      $http.get('/api/users/me')
      .success(function (showWorkout) {
        deferred.resolve(showWorkout);
      })
      .error(function (error) {
        deferred.reject(err.data);
      });
      return deferred.promise;
    };
    
    // service.logWorkout = function (formData) {
    //   var deferred = $q.defer();
    //   $http.post('/api/users/log/', formData)
    //     .success(function (updatedWorkout) {
    //       deferred.resolve(updatedWorkout);
    //     })
    //     .catch(function (err) {
    //       deferred.reject(err.data);
    //     });
    //   return deferred.promise;
    // };

    // service.unlogWorkout = function (formData) {
    //   var deferred = $q.defer();
    //   $http.post('/api/users/unlog/', formData)
    //   .success(function (updatedWorkout) {
    //     deferred.resolve(updatedWorkout);
    //   })
    //   .catch(function (err) {
    //     deferred.reject(err.data);
    //   });
    //   return deferred.promise;
    // };

    service.logToggle = function (logPath, dateObject) {
      var deferred = $q.defer();
      var convertedDate = new Date(dateObject);
      $http.post('/api/users/' + logPath, convertedDate)
      .success(function (updatedWorkout) {
        console.log('dateObject: ',dateObject);
        console.log('convertedDate: ',convertedDate);
        deferred.resolve(updatedWorkout);
      })
      .catch(function (err) {
        console.log('dateObject: ',dateObject);
        console.log('convertedDate: ',convertedDate);
        deferred.reject(err.data);
      });
      return deferred.promise;
    }
    return service;
  });