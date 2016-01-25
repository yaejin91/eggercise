'use strict';

angular.module('eggercise')
  .controller('AcceptInviteCtrl', ['$scope', '$location', '$log', '$routeParams', 'InviteService', function ($scope, $location, $log, $routeParams, InviteService) {

    var vm = this;
    vm.invite = {};
    console.log('This is $routeParams: ', $routeParams);
    vm.invite_id = $routeParams.invite_id;
    vm.newUser = {};

    //get invite
    vm.getInvite = function (id) {
      console.log('This is the id from the getInvite view: ', id);
      InviteService.showInvite(id)
        .then(function (data) {
          console.log('This is data: ', data);
          vm.invite = data;
          console.log('This is vm.invite: ', vm.invite)
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
