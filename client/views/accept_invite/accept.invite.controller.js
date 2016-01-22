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


    console.log('This is vm: ', vm);
    console.log('This is vm.invite.inviteId: ', vm.invite.inviteId);
    // InviteService.acceptInvite(vm.invite.inviteId)
    // .then(function (group) {
    //   vm.group = group;
    //   $location.path('/group/show/' + vm.group._id);
    // })
    // .catch(function (error) {
    //   console.log(error);
    //   vm.error = error;
    // });
  }]);
