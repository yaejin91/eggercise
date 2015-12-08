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

    //show a group
    vm.showGroup = function (id){
      GroupService.showGroup()
      .then(function (data){
        console.log('This is the data from showGroup: ', data);
        for(var i = 0; i < data.length; i++){
          vm.groups.push(data[i]);
        }
      })
      .catch(function (err){
        console.log('deleteGroup err:' + err);
      })
    }


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
      .catch(function (err){
        console.log('deleteGroup err:' + err);
      })
    }


  }]);
