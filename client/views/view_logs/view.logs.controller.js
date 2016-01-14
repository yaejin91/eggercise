'use strict';

angular.module('eggercise')
  .controller('ViewLogCtrl', ['$location', '$log', '$routeParams', 'ViewLogService', function ($location, $log, $routeParams, ViewLogService) {
    var vm = this;
    vm.formData = {};
    vm.logs =[];
    var userId = $routeParams.userId;

    angular.extend(vm, {
      name: 'ViewLogCtrl'
    });

    //Show all exisiting groups in database
    vm.showLogs = function () {
      ViewLogService.showLogs(userId)
      .then(function (foundLogs){
        for(var i = 0; i < foundLogs.length; i++){
          vm.logs.push(foundLogs[i]);
        }
      })
      .catch(function (error){
        console.log('showLogs err:' + error);
      })
    }
  }]);
