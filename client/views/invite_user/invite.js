'use strict';

angular.module('eggercise')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/invites/accept', {
        templateUrl: 'views/invite/invite.html',
        controller: 'InviteCtrl',
        controllerAs: 'vm'
      });
  });