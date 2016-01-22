'use strict';

angular.module('eggercise')
  .controller('CreateGroupCtrl', ['$location', '$log', '$routeParams', 'GroupService', 'ErrorService', function ($location, $log, $routeParams, GroupService, ErrorService) {
    var vm = this;
    vm.groups = [];
    vm.formData = {};
    vm.startDatePickerIsOpen = false;
    vm.endDatePickerIsOpen = false;

    vm.valuationDatePickerOpen = function ($event, whichDate) {
      if ($event) {
          $event.preventDefault();
          $event.stopPropagation(); // This is the magic
      }
      if(whichDate === 'start'){
        this.startDatePickerIsOpen = true;
      }else if(whichDate === 'end'){
        this.endDatePickerIsOpen = true;
      }

      };

        angular.extend(vm, {

          name: 'CreateGroupCtrl',

          createGroup: function () {
            GroupService.createGroup(vm.formData)
              .then(function (data) {
                vm.groups.push(data);
                vm.formData = {};
                $location.path('/group');
              })
              .catch(function (err) {
                ErrorService.errorToasty(err);
              });
          }
        });
  }]);
