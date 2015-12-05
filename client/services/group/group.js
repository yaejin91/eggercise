'use strict';

angular.module('eggercise')
  .service('GroupService', function ($rootScope, $cookieStore, $q, $http){
    var service = {};

    // function handleError(){

    // }

  //delete group by group id
  service.deleteGroup = function (id){
    console.log("I'm fabulous cuz im in GroupService! ", id);

    return $http.post('/api/groups/delete/' + id)
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