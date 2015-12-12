'use strict';

angular.module('eggercise')
  .service('WorkoutService', function ($rootScope, $q, $http) {
    var service = {};

    service.logWorkout = function (formData) {
      var deferred = $q.defer();
      $http.post('/api/users/log/', formData)
        .success(function (updatedWorkout) {
          deferred.resolve(updatedWorkout);
        })
        .catch(function (err) {
          deferred.reject(err.data);
        });
      return deferred.promise;
    };

    service.unlogWorkout = function (formData) {
      var deferred = $q.defer();
      $http.post('/api/users/unlog/', formData)
      .success(function (updatedWorkout) {
        deferred.resolve(updatedWorkout);
      })
      .catch(function (err) {
        deferred.reject(err.data);
      });
      return deferred.promise;
    };
    return service;
  });