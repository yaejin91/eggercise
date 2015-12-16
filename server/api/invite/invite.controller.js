'use strict';

var _ = require('lodash');

var Group = require('../group/group.model'),
  User = require('../user/user.model'),
  Invite = require('./invite.model');

function handleError (res, err, status) {
  return res.status(status).json({err: err});
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
    if (error) {
      return handleError(res, 'Did not create the invite', 500);
    } else {
      res.json(savedInvite);
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
        console.log('invite.email: ',invite.email);
        User.findOne({ email: invite.email}, function (error, user) {
          if (error) {
            return handleError(res, error);
          } else {
            console.log('user.email: ',user.email);
            console.log('user: ', user);
            user._groups.push(invite._group);
            user.save();
            res.status(200).json(user);
            console.log('invite: ',invite);
          }
        });
      }
    });
}
