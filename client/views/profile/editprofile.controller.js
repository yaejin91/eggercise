'use strict';

angular.module('eggercise')
  .controller('ProfileCtrl', ['EditProfile', '$routeParams', '$rootScope', '$cookieStore', '$log', function (EditProfile, $routeParams, $rootScope, $cookieStore, $log) {

    var vm = this;
    vm.user = {};
    vm.formData = {};
    vm.id = $cookieStore.get('globals').currentUser._id;

    //Edit Profile
    EditProfile.editProfile(vm.user)
      .then(function (data) {
        vm.user = data;
      })
      .catch(function (data) {
        $log.log(data);
      });

  }]);