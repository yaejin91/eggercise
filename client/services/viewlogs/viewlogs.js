'use strict';

angular.module('eggercise')
  .service('viewLogService', function ($rootScope, $q, $http) {
    var service = {};

    //show exercise logs of member
    service.showLogs = function (id){
      var deferred = $q.defer();
     $http.get('/api/users/viewLogs/' + id)
        .success(function (foundLogs) {
          deferred.resolve(foundLogs);
        })
        .error(function (error) {
          deferred.reject('Error: ', error);
        });
        return deferred.promise;
    };
    return service;
  });
