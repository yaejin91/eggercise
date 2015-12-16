'use strict';

angular.module('eggercise')
  .controller('InviteCtrl', ['$location', '$log', '$routeParams', function ($location, $log, $routeParams) {

    var vm = this;
    vm.formData = {};
    vm.invites =[];

    angular.extend(vm, {
      name: 'InviteCtrl'
    });

    //Show all exisiting groups in database
    vm.createInvite = function () {
      vm.formData._group = $routeParams.group_id;
      InviteService.createInvite(vm.formData)
      .then(function (foundInvites){
        for(var i = 0; i < foundInvites.length; i++){
          vm.invites.push(foundInvites[i]);
        }

        $location.path('/group/updateGroup/');

        setTimeout(notification, 1000);
      })
      .catch(function (error){
        console.log('createInvites error:' + error);
      })


      function notification () {
        var sentInvite = document.getElementById('sentInvite');
        sentInvite.innerHTML = 'You have successfully sent an invite to: ' + vm.formData.email;
        sentInvite.style.display = 'block';

        setTimeout(function (){
          var sentInvite = document.getElementById('sentInvite');
          sentInvite.style.display = 'none';
          sentInvite.innerHTML = '';
        }, 3000);
      }
    }

  }]);