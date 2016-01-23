'use strict';

angular.module('eggercise')
  .controller('SignupCtrl', ['$location', 'Auth', 'ErrorService', function ($location, Auth, ErrorService) {

    var vm = this;

    angular.extend(vm, {

      name: 'SignupCtrl',

      /**
       * Signup
       */
      signup: function () {
        Auth.signup(vm.user)
          .then(function () {
            $location.path('/group');
          })
          .catch(function (err) {
            $location.path('/signup');
            ErrorService.errorToasty(err);
          });
      }

    });

  }]);
