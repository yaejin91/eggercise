'use strict';

angular.module('eggercise')
  .controller('InviteCtrl', ['$location', '$log', '$routeParams', 'InviteService', function ($location, $log, $routeParams,InviteService) {

    var vm = this;
    vm.formData = {};
    vm.invites =[];

    // var creatorId = $routeParams.creatorId;
    // vm.formData._creator = creatorId

    angular.extend(vm, {
      name: 'InviteCtrl'
    });

    //Show all exisiting groups in database
    vm.createInvites = function () {
      InviteService.createInvites()
      .then(function (foundInvites){
        for(var i = 0; i < foundInvites.length; i++){
          vm.invites.push(foundInvites[i]);
        }
      })
      .catch(function (error){
        console.log('createInvites error:' + error);
      })
    }
  }]);
