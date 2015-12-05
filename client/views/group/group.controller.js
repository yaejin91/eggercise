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

      name: 'GroupCtrl',

      createGroup: function () {
      	GroupService.createGroup(vm.formData)
      		.then(function (data) {
      			vm.groups.push(data);
      			console.log(vm.groups);
      		})
      		.catch(function (err) {
      			vm.error = err;
      			$log.error('Error: ', err);
      		});
      }

    });

  });
