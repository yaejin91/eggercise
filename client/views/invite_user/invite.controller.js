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
      if (message === 'error') {
        console.log('In the flashMessage error & data: ', data);
        toasty[message]({
          title: 'Failure',
          msg: data + ' has already been invited. Please select a different email address',
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
      console.log('This is the $routeParams: ', $routeParams);
      vm.formData._group = $routeParams.id;
      console.log('This is vm.formData', vm.formData);
      console.log('This is vm.formData._group', vm.formData._group);
      InviteService.createInvite(vm.formData)
      .then(function (foundInvite){
        console.log('This is foundInvite: ', foundInvite);
        vm.invites.push(foundInvite);
        vm.flashMessage('success', foundInvite);
      })
      .catch(function (error){
        console.log('This is the error: ', error);
        console.log('This was the user input: ', vm.formData.email);
        vm.flashMessage('error', vm.formData.email)
        $location.path('/group/show/vm.formData._group');
      })
    }
  }]);
