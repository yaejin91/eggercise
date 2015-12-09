'use strict';

angular.module('eggercise')
  .controller('GroupCtrl', ['$log', '$routeParams', 'GroupService', function ($log, $routeParams,GroupService) {

    var vm = this;
    vm.formData = {};
    vm.groups =[];

    // var creatorId = $routeParams.creatorId;
    // vm.formData._creator = creatorId

    angular.extend(vm, {

      name: 'GroupCtrl'

    });

    //delete a group
    vm.deleteGroup = function (id){
      GroupService.deleteGroup(id)
      .then(function (data){
        console.log('successfully deleted');
        for(var i = 0; i < vm.groups.length; i++){
          if(vm.groups[i]._id === data._id){
            vm.groups.splice(i,1);
            break;
          } 
        }
      })
      .catch(function (error){
        console.log('deleteGroup error:' + error);
      })
    }


  }]);
