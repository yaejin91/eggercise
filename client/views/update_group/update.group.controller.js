'use strict';

angular.module('eggercise')
  .controller('UpdateGroupCtrl', ['$location', '$log', '$routeParams', 'GroupService', function ($location, $log, $routeParams,GroupService) {

    var vm = this;
    vm.formData = {};
    vm.group = {};
    vm.groups = [];
    vm.group_id = $routeParams.group_id;
    console.log('$routeParams: ', $routeParams.group_id);

    angular.extend(vm, {

      name: 'UpdateGroupCtrl'

    });

  
    //update group
    vm.updateGroup = function (id, formData) {
      console.log('ctrl formData: ', vm.formData);
      GroupService.updateGroup(id, vm.formData)
        .then(function (updatedGroup){
          vm.formData = updatedGroup;
          console.log('ctrl: updatedGroup: ', updatedGroup);
          $location.path('/group')
        })
        .catch(function(error) {
          vm.error = error;
          console.log('updatedGroup Error: ',  error);
        });
    }


  }]);
