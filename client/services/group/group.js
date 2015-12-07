'use strict';

angular.module('eggercise')
  .service('GroupService', function ($rootScope, $cookieStore, $q, $http){
    var service = {};

    var tempId = '566234fbc6e3a5280b12099f';


  //delete group by group id
  service.deleteGroup = function (id){
    console.log("I'm fabulous cuz im in GroupService!");
    console.log('id: ', id);

    // return $http.post('/api/groups/delete/' + id)
    return $http.post('/api/groups/delete/' + tempId)
      .sucess(function (deletedGroup){
        return deletedGroup;
      })
      .error(function (err){
        $q.reject(err);
        console.log('Error: ' + err);
      });
  };

  return service;

});