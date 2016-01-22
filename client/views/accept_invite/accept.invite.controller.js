'use strict';

angular.module('eggercise')
  .controller('AcceptInviteCtrl', ['$scope', '$location', '$log', '$routeParams', 'InviteService', 'ErrorService', function ($scope, $location, $log, $routeParams, ErrorService) {
    if ($scope.unauthorized) {
      return;
    }

    var vm = this;
    vm.inviteId = $routeParams.id;
    InviteService.acceptInvite(vm.inviteId)
    .then(function (group) {
      vm.group = group;
      $location.path('/group/show/' + vm.group._id);
    })
    .catch(function (error) {
      ErrorService.errorToasty(error);
    });
  }]);
