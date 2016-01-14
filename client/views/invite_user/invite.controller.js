'use strict';

angular.module('eggercise')
  .controller('InviteCtrl', ['$location', '$log', '$routeParams', 'InviteService', 'toasty', 'GroupService', function ($location, $log, $routeParams, InviteService, toasty, GroupService) {

    var vm = this;
    vm.formData = {};
    vm.invites = [];

    angular.extend(vm, {
      name: 'InviteCtrl'
    });

    vm.flashMessage = function(foundInvite) {
      GroupService.showGroup(foundInvite._group)
      .then(function (group) {
        toasty.success({
          title: 'Invited!',
          msg: 'You have sucessfully invited ' + vm.formData.email + " to " + group.name,
          theme: "material"
        });
      })
    }


    //Show all exisiting groups in database
    vm.createInvite = function () {
      vm.formData._group = $routeParams.group_id;
      InviteService.createInvite(vm.formData)
      .then(function (foundInvite){
        vm.invites.push(foundInvite);
        vm.flashMessage(foundInvite);
      })
      .catch(function (error){
        console.log('createInvites error:' + error);
      })
    }

  }]);
