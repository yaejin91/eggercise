'use strict';

angular.module('eggercise')
  .controller('ShowGroupCtrl', ['$location', '$log', '$routeParams', 'GroupService', function ($location, $log, $routeParams, GroupService) {
    var vm = this;

      vm.group = {};
      vm.startdate = {};
      vm.enddate = {};
      vm.totaldays = {};
      vm.elapsedday = {};
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
              Date.daysBetween = function (sdate, edate) {
                var one_day = 1000 * 60 * 60 * 24;
                var sdate_ms = sdate.getTime();
                var edate_ms = edate.getTime();
                var difference_ms = edate_ms - sdate_ms;
                return Math.round(difference_ms/one_day);
              }
              var tdate = new Date();
              vm.totaldays = Date.daysBetween(sdate, edate);
              vm.elapsedday = Date.daysBetween(sdate, tdate);
              console.log('total days: ', vm.totaldays);
              console.log('elapsedday: ', vm.elapsedday);
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