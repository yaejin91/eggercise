'use strict';

var _ = require('lodash');

var Group = require('../group/group.model'),
  User = require('../user/user.model'),
  Invite = require('./invite.model'),
  EmailService = require('../../email/email.service');

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
    var subject = "You've been invited to join eggercise!"
    var emailText = generateInvitation(savedInvite._group);
    var emailTo = savedInvite.email;

    if (error) {
      return handleError(res, 'Did not create the invite', 500);
    } else {
      EmailService.send(emailTo, subject, emailText);
      res.json(savedInvite);
    }
  });
}

function generateInvitation (id) {
  var emailBody = "You've been invited, please join by clicking on the link below to accept your invitation."
  var emailLink = "http://eggercise.com/invites/accept/" + id;

  return emailBody + ' ' + emailLink;
}
