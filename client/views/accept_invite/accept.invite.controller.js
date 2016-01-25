'use strict';

angular.module('eggercise')
  .controller('AcceptInviteCtrl', ['$scope', '$location', '$log', '$routeParams', 'InviteService', function ($scope, $location, $log, $routeParams, InviteService) {

    var vm = this;
    vm.invite = {};
    vm.invite_id = $routeParams.invite_id;
    vm.newUser = {};
    vm.group_id;

    //get invite
    vm.getInvite = function (id) {
      console.log('This is the id from the getInvite view: ', id);
      InviteService.showInvite(id)
        .then(function (data) {
          console.log('This is data from the getInvite view: ', data);
          vm.invite = data;
          vm.group_id = vm.invite._group._id;
          vm.newUser.group = vm.invite._group._id;
          vm.newUser.email = vm.invite.email;
          console.log('This is vm.invite from the getInvite view: ', vm.invite);
          console.log('This is vm.group_id from the getInvite view: ', vm.group_id);
          console.log('This is vm.newUser: ', vm.newUser);
        })
        .catch(function (error) {
          ErrorService.errorToasty(error);
        });
    }

    vm.acceptInvite = function (id) {
      console.log('This is the id from the acceptInvite view: ', id);
      console.log('This is vm.newUser: ', vm.newUser);
      InviteService.acceptInvite(vm.newUser)
      .then(function (data) {
        console.log('This is data: ', data);
        vm.newUser = data;
        console.log('This is newUser: ', newUser);
        $location.path('/group/show/' + vm.group);
      })
      .catch(function (error) {
        ErrorService.errorToasty(error);
      })
    }
  }]);
