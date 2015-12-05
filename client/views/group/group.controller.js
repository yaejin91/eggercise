'use strict';

angular.module('eggercise')
  .controller('GroupCtrl', ['GroupService', function (GroupService) {

    var vm = this;
    vm.formData = {};
    vm.groups =[];

    angular.extend(vm, {
      name: 'GroupCtrl'
    });

    //delete a group
    vm.deleteGroup = function (id){
      vm.formData.id = id;
      GroupService.deleteGroup(vm.formData.id)
      .then(function (data){
        console.log('successfully deleted');
        for(var i = 0; i < vm.groups.length; i++){
          if(vm.groups[i]._id === data._id){
            vm.groups.splice(i,1);
            break;
          } 
        }
      })
      .catch(function (err){
        console.log('deleteGroup err:' + err);
      })
    }


  }]);
