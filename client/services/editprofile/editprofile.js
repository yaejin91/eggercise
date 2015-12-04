'use strict';

angular.module('eggercise')
  .factory('EditProfile', function ($rootScope, $cookieStore, $q, $http) {
    var service = {};

    service.editProfile = function (user) {
      var deferred = $q.defer();
      console.log("I made it to edit profile service");
      $http.post('/api/users/updateProfile', user)
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