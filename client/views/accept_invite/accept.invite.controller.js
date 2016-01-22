'use strict';

angular.module('eggercise')
  .controller('AcceptInviteCtrl', ['$scope', '$location', '$log', '$routeParams', 'InviteService', function ($scope, $location, $log, $routeParams,InviteService) {
    // if ($scope.unauthorized) {
    //   return;
    // }

    var vm = this;
    vm.invite = {};
    console.log('This is $routeParams: ', $routeParams);
    vm.invite.inviteId = $routeParams.invite_id;
    vm.newUser = {};
    vm.group = groupId;

    //get invite
    vm.getInvite = function (id) {
      InviteService.showInvite(id)
        .then(function (data) {
          console.log('This is data: ', data);
          vm.invite = data;
          console.log('This is vm.invite: ', vm.invite)
        })
        .catch(function (error) {
          vm.error = error;
        });
    }
    vm.getInvite(vm.invite.inviteId);

    vm.acceptInvite = function (id) {
      InviteService.acceptInvite(id)
      .then(function (data) {
        console.log('This is data: ', data);
        vm.newUser = data;
        console.log('This is newUser: ', newUser);
        $location.path('/group/show/' + vm.group);
      })
      .catch(function (error) {
        vm.error = error;
      })
    }
  }]);
