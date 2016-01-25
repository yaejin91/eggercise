'use strict';

angular.module('eggercise')
  .controller('AcceptInviteCtrl', ['$scope', '$location', '$log', '$routeParams', 'Auth', 'ErrorService', 'InviteService', function ($scope, $location, $log, $routeParams, Auth, ErrorService, InviteService) {

    var vm = this;
    vm.invite = {};
    vm.invite_id = $routeParams.invite_id;
    vm.newUser = {};
    vm.group_id;

    //get invite
    vm.getInvite = function (id) {
      console.log('This is the id from the getInvite view: ', id);
      InviteService.showInvite(id)
        .then(function (data) {
          console.log('This is data from the getInvite view: ', data);
          vm.invite = data;
          vm.group_id = vm.invite._group._id;
          vm.newUser.group = vm.invite._group._id;
          vm.newUser.email = vm.invite.email;
          console.log('This is vm.invite from the getInvite view: ', vm.invite);
          console.log('This is vm.group_id from the getInvite view: ', vm.group_id);
          console.log('This is vm.newUser: ', vm.newUser);
        })
        .catch(function (error) {
          ErrorService.errorToasty(error);
        });
    }


//Invitee accepts invitation
// exports.acceptInvite = function(req, res) {
//   var inviteId = req.params.invite_id;

//   Invite.findById({ _id: inviteId})
//     .exec(function (error, invite) {
//       if (error) {
//         errorHandler.handle(res, 'Invite not found', 404);
//       } else if (invite != null) {
//         User.findOne({ email: invite.email}, function (error, user) {
//           if (error) {
//             errorHandler.handle(res, 'User not found', 404);
//           } else {
//             user._groups.push(invite._group);
//             user.save(function (error, savedUser) {
//               if (error) {
//                 errorHandler.handle(res, error, 500);
//               } else {
//                 Group.findById( {_id: invite._group}, function (error, group) {
//                   group._members.push(user._id);
//                   group.save(function (error, savedGroup) {
//                     if (error) {
//                       errorHandler.handle(res, error, 500);
//                     } else {
//                       res.status(200).json(group);
//                     }
//                   });
//                 })
//               }
//             });
//           }
//         });
//       } else {
//         res.status(404).json({message: 'invite not found'});
//       }
//     });


    vm.acceptInvite = function (newUser) {
      console.log('This is newUser from the acceptInvite view:', newUser);
      console.log('This is vm.newUser from the acceptInvite view: ', vm.newUser);
      newUser.name = vm.newUser.name;
      newUser.password = vm.newUser.password;
      InviteService.acceptInvite(vm.invite_id, newUser)
      Auth.signupForInvite(vm.invite_id, newUser)
      .then(function (data) {
        console.log('This is data: ', data);
        console.log('This is newUser: ', newUser);
        $location.path('/group/show/' + vm.group);
      })
      .catch(function (error) {
        ErrorService.errorToasty(error);
      })
    }
}]);
