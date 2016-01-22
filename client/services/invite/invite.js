'use strict';

angular.module('eggercise')
  .service('InviteService', function ($rootScope, $q, $http) {
    var service = {};

    service.createInvite = function (formData) {
      var deferred = $q.defer();
      $http.post('/api/invites/create', formData)
        .success(function (returnedInvite) {
          deferred.resolve(returnedInvite);
        })
        .error(function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    service.acceptInvite = function (id) {
      var deferred = $q.defer();
      $http.get('/api/invites/accept/' + id)
        .success(function (showGroup) {
          console.log('This is id: ', id);
          console.log('This is showGroup: ', id);
          deferred.resolve(showGroup);
        })
        .error(function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    //show invite by invite id
    service.showInvite = function (id) {
      var deferred = $q.defer();
      $http.get('/api/invites/accept/' + id)
        .success(function (showInvite) {
          console.log('This the the showInvite: ', showInvite);
          deferred.resolve(showInvite);
        })
        .error(function (error) {
          deferred.reject('Error: ', error);
        });
        return deferred.promise;
    };
    return service;
  });
