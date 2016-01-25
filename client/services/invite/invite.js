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

    // Show invite by invite id
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

    // Accept invitation
    service.acceptInvite = function (newUser) {
      console.log('This is newUser in acceptInvite (services): ', newUser);
      var deferred = $q.defer();
      $http.post('/api/invites/accept', newUser)
        .success(function (acceptedInvitation) {
          console.log('This is acceptedInvitation: ', acceptedInvitation);
          deferred.resolve(acceptedInvitation);
        })
        .error(function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    return service;
  });
