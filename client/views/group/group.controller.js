'use strict';

angular
	.module('eggercise')
  .controller('GroupCtrl', function ($log, $routeParams, GroupService) {

    var vm = this;
    // var creatorId = $routeParams.creatorId;

    vm.groups = [];
    vm.formData = {};
    // vm.formData._creator = creatorId

    angular.extend(vm, {

      name: 'GroupCtrl'

    });

  });
