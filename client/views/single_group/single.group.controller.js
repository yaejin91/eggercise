'use strict';

angular.module('eggercise')
  .controller('ShowGroupCtrl', ['$location', '$log', '$routeParams', 'GroupService', function ($location, $log, $routeParams, GroupService) {
    var vm = this;

      vm.group = {};
      vm.startdate = {};
      vm.enddate = {};
      vm.group_id = $routeParams.id;

      angular.extend(vm, {

        name: 'ShowGroupCtrl',

        //show Group
        showGroup: function (id) {
          GroupService.showGroup(id)
            .then(function (data) {
              var sdate = new Date(data.start);
              vm.startdate = ((sdate.getMonth() + 1) + "/" + sdate.getDate());
              var edate = new Date(data.end);
              vm.enddate = ((edate.getMonth() + 1) + "/" + edate.getDate());
              vm.group = data;
              console.log(vm.group);
              $location.path('/group/show');
            })
            .catch(function (err) {
              vm.error = err;
              $log.error('Error: ', err);
            });
        }

      });
  }]);