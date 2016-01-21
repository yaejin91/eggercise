'use strict';

var _ = require('lodash');

var Group = require('../group/group.model'),
  User = require('../user/user.model'),
  Invite = require('./invite.model'),
  EmailService = require('../../email/email.service');

function handleError (res, err, status) {
  return res.status(status).json({err: err});
}

function handleSuccess(res, message, status) {
  return res.status(status).json({message: message});
}

function generateInvitation (invitedUserName, groupCreator, id) {
  var emailBody = "Hello " + invitedUserName + ", you've been invited by " + groupCreator + " to join the Eggercise app! Please join by clicking on the link to accept your invitation."
  var localBaseUrl = "localhost:3000";
  var eggerciseBaseUrl = "https://www.eggercise.com"
  var fullUrl = localBaseUrl + "/invites/accept/" + id;
  return emailBody + " " + fullUrl;
}

function createInvite (savedInvite, req, res) {
  var creatorId = req.user._id;
  var groupId = req.body._group;
  var groupCreator = req.user;
  var groupCreatorName = groupCreator.name;
  var invitedUserName = req.body.name;

  if (savedInvite) {
    var subject = "You've been invited to join eggercise!"
    var emailText = generateInvitation(invitedUserName, groupCreatorName, savedInvite._id);
    var emailTo = savedInvite.email;

    EmailService.send(emailTo, subject, emailText, sendInvite(savedInvite, req, res));
  } else {
    return handleError(res, 'Did not create the invite', 422);
  }
}

function sendInvite (savedInvite, req, res) {
  if (res.json) {
    savedInvite.sent_at = Date.now();
    var returnedPromise = savedInvite.save();
    renderInvite(returnedPromise, savedInvite, res);
  } else {
    console.log('Error for failed send: ', err);
    res.json(err);
  }
}

function renderInvite (returnedPromise, sentInvite, res) {
  if (!returnedPromise) {
    console.log('The invitation did not save successfully.');
  } else {
    res.json(sentInvite);
  }
}

//Creates a new invite in the DB
exports.create = function (req, res) {
  var invite = new Invite ({
    name: req.body.name,
    email: req.body.email,
    _group: req.body._group,
    status: false
  });

  // Do a check here for the invite in the database
  console.log('This is invite: ', invite);
  console.log('-------------------------');
  console.log('This is invite.name: ', invite.name);
  console.log('-------------------------');
  console.log('This is invite.email: ', invite.email);
  console.log('-------------------------');
  console.log('This is invite._group: ', invite._group);
  console.log('-------------------------');
  console.log('This is invite.status: ', invite.status);
  console.log('-------------------------');

  var query = Invite.find ({ email: invite.email, _group: invite._group });
  query.exec(function (err, foundInvitationsArray) {
    console.log('This is the foundInvitationsArray: ', foundInvitationsArray);
    console.log('foundInvitationsArray: ', foundInvitationsArray);

    if (!foundInvitationsArray) {
      console.log('No invite found in the database -- invite will be created.');
      invite.save(createInvite(invite, req, res));
    } else {
      foundInvitationsArray.forEach(function checkInvitations(foundInvite, index, inviteArray) {

        console.log('foundInvitationsArray[' + index + '] = ' + foundInvite);
        console.log(foundInvite._group);
        console.log(invite._group);

        if (foundInvite._group.toString() === invite._group.toString()) {
          console.log('This user already has an invite created for them for this group');
        }
      });
    }
  });
}



//Invitee accepts invitation
exports.acceptInvite = function(req, res) {
  var inviteId = req.params.invite_id;

  Invite.findById({ _id: inviteId})
    .exec(function (error, invite) {
      if (error) {
        return handleError(res, error);
      } else if (invite != null) {
        User.findOne({ email: invite.email}, function (error, user) {
          if (error) {
            return handleError(res, error);
          } else {
            user._groups.push(invite._group);
            user.save(function (error, savedUser) {
              if (error) {
                return handleError(res, error);
              } else {
                Group.findById( {_id: invite._group}, function (error, group) {
                  group._members.push(user._id);
                  group.save(function (error, savedGroup) {
                    if (error) {
                      return handleError(res, error);
                    } else {
                      res.status(200).json(group);
                    }
                  });
                })
              }
            });
          }
        });
      } else {
        res.status(404).json({message: 'invite not found'});
      }
    });
}
