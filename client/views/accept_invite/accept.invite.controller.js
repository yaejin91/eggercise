'use strict';

angular.module('eggercise')
  .controller('AcceptInviteCtrl', ['$location', '$log', '$routeParams', 'InviteService', function ($location, $log, $routeParams,InviteService) {
    var vm = this;
    vm.inviteId = $routeParams.id;
    InviteService.acceptInvite(vm.inviteId)
    .then(function (group) {
      console.log('group: ', group);
      vm.group = group;
      $location.path('/group/show?id=' + vm.group._id);
    })
    .catch(function (error) {
      vm.error = error;
      $location.path('/');
    });
  }]);
