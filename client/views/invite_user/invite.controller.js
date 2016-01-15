'use strict';

angular.module('eggercise')
  .controller('InviteCtrl', ['$location', '$log', '$routeParams', 'InviteService', 'toasty', 'GroupService', function ($location, $log, $routeParams, InviteService, toasty, GroupService) {

    var vm = this;
    vm.formData = {};
    vm.invites = [];

    angular.extend(vm, {
      name: 'InviteCtrl'
    });

    vm.flashMessage = function(message, data) {
      if (data === {'err': 'Did not create the invite'}) {
        toasty[message]({
          title: 'Failure',
          msg: 'You have already invited this member to the group',
          theme: 'material'
        })
      } else {
        GroupService.showGroup(data._group)
        .then(function (group) {
          console.log('This is data: ', data);
          toasty[message]({
            title: 'Invited!',
            msg: 'You have sucessfully invited ' + vm.formData.email + " to " + group.name,
            theme: "material"
          });
        })
      }
    }


    //Show all exisiting groups in database
    vm.createInvite = function () {
      vm.formData._group = $routeParams.group_id;
      InviteService.createInvite(vm.formData)
      .then(function (foundInvite){
        console.log('This is foundInvite: ', foundInvite);
        vm.invites.push(foundInvite);
        vm.flashMessage('success', foundInvite);
      })
      .catch(function (error){
        vm.flashMessage('error', error)
        console.log('This is the error: ', error);
      })
    }
  }]);
