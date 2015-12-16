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

function generateInvitation (id) {
  var emailBody = "You've been invited, please join by clicking on the link below to accept your invitation."
  var emailLink = "http://localhost:3000/invites/accept/" + id;
  return emailBody + ' ' + emailLink;
}

//Creates a new invite in the DB
exports.create = function (req, res) {
  var creatorId = req.user._id;
  var groupId = req.body._group;

  var invite = new Invite ({
    email: req.body.email,
    _group: groupId,
    status: false
  });
  invite.save(function (error, savedInvite) {
    var subject = "You've been invited to join eggercise!"
    var emailText = generateInvitation(savedInvite._group);
    var emailTo = savedInvite.email;

    console.log('This is the error: ', error);
    console.log('This is the savedInvite: ', savedInvite);

    if (savedInvite) {
      EmailService.send(emailTo, subject, emailText, function(err, json) {
        console.log(json);
        if (json) {
          savedInvite.sent_at = Date.now();
          savedInvite.save();
            if (savedInvite.sent_at !== null) {
              res.json(savedInvite);
            } else {
              console.log('The invitation did not save successfully.');
            }
        } else {
          return err;
        }
      })
    } else {
      return handleError(res, 'Did not create the invite', 500);
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
      } else {
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
      }
    });
}
