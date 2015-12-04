'use strict';

angular.module('eggercise')
  .factory('EditProfile', function ($rootScope, $cookieStore, $q, $http) {
    var service = {};
    var formData = {};

    service.editProfile = function (user) {
      var deferred = $q.defer();
      $http.post('/api/users/updateProfile', formData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .catch(function (err) {
          deferred.reject(err.data);
        });
      return deferred.promise;
    };
    return service;
  });