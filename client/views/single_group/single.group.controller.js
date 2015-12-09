'use strict';

angular.module('eggercise')
  .controller('ShowGroupCtrl', ['$location', '$log', '$routeParams', 'GroupService', function ($location, $log, $routeParams, GroupService) {
    var vm = this;

      vm.groups = [];

      angular.extend(vm, {

        name: 'ShowGroupCtrl',

        showGroup: function () {
          GroupService.createGroup
        }
      })
  }])