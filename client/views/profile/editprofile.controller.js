'use strict';

angular.module('eggercise')
  .controller('ProfileCtrl', ['EditProfile', '$routeParams', '$rootScope', '$cookieStore', '$log', '$location', 'Auth', 'ErrorService', function (EditProfile, $routeParams, $rootScope, $cookieStore, $log, $location, Auth, ErrorService) {

    var vm = this;
    vm.user = {};
    vm.formData = {};
    vm.id = $rootScope._id;
    vm.loggedUser = {}

    angular.extend(vm, {

    //get User
    getUser: function () {
      vm.loggedUser = Auth.getUser();
    },

    //Edit Profile
    editProfile: function () {
      EditProfile.editProfile(vm.formData)
        .then(function (data) {
          vm.user = data;
          $location.path('/');
        })
      .catch(function (err) {
        ErrorService.errorToasty(err);
      });
    }
   });
}]);