'use strict';

angular.module('eggercise')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/invites/accept/:id', {
        //You must use " " instead of an empty string "" because Angular uses an if (template) check before firing the controller, and an empty string evaluates to false.
        template: 'views/create_group/accept.invite.html',
        controller: 'AcceptInviteCtrl',
        controllerAs: 'vm'
      });
  });
