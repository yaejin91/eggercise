'use strict';

angular.module('eggercise')
  .controller('SignupCtrl', function ($location, Auth) {

    var vm = this;

    angular.extend(vm, {

      name: 'SignupCtrl',

      /**
       * User credentials
       */
      user: { name: 'Testing User', email: 'test2@test.com', password: 'test' },

      /**
       * Signup
       */
      signup: function () {
        Auth.signup(vm.user)
          .then(function () {
            $location.path('/group');
          })
          .catch(function (err) {
            vm.error = err;
            $location.path('/signup');
          });
      }

    });

  });
