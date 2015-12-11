'use strict';

angular.module('eggercise')
  .controller('DeleteGroupCtrl', ['$location', '$log', '$routeParams', 'GroupService', function ($location, $log, $routeParams, GroupService) {

    var vm = this;


    angular.extend(vm, {
      name: 'DeleteGroupCtrl'
    });


    //delete a group
    vm.deleteGroup = function (id){
      GroupService.deleteGroup(id)
      .then(function (data){
        $location.path('/groups')
        console.log('data: ', data);
        
      })
      .catch(function (error){
        vm.error = error;
        console.log('deleteGroup error:' + error);
      })
    }
  }]);