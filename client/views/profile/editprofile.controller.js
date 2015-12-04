'use strict';

angular.module('eggercise')
  .controller('ProfileCtrl', ['EditProfile', '$routeParams', '$rootScope', '$cookieStore', '$log', function (EditProfile, $routeParams, $rootScope, $cookieStore, $log) {

    var vm = this;
    vm.user = {};
    vm.formData = {};
    vm.id = $rootScope._id;

    //Edit Profile
    EditProfile.editProfile(vm.formData)
      .then(function (data) {
        vm.user = data;
      })
      .catch(function (data) {
        $log.log(data);
      });

  }]);