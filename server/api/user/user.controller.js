'use strict';

var _ = require('lodash');

var authService = require('../../auth/auth.service');
var User = require('./user.model');

function handleError (res, err) {
  return res.status(500).send(err);
}

/**
 * Creates a new user in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  User.create(req.body, function (err, user) {
    if (err) { return handleError(res, err); }
    res.status(201).json({
      user: _.omit(user.toObject(), ['passwordHash', 'salt']),
      token: authService.signToken(user._id)
    });
  });
};

/**
 * Return the current logged user.
 *
 * @param req
 * @param res
 */
exports.getMe = function (req, res) {
  User.findById(req.user._id, function (err, user) {
    if (err) { return handleError(res, err); }
    if (!user) { return res.json(401); }
    res.status(200).json(user);
  });
};


/**
 * Update a user profile in the DB.
 *
 * @param req
 * @param res
 */
exports.updateProfile = function (req, res) {
  var query = req.user._id;
  var options = {new: true};

  var formInputs = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };

  var update = {};
  for (var key in formInputs) {
    if(formInputs[key]) {
      update[key] = formInputs[key];
    }
  }

  User.findByIdAndUpdate(query, update, options, function (err, user) {
    if (err) { return handleError(res, err);}
    res.status(200).json(user);
  });
};