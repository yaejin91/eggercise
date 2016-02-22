'use strict';

var _ = require('lodash'),
mongoose = require('mongoose');

var authService = require('../../auth/auth.service');
var User = require('./user.model');

var errorHandler = require('../../error/error-handling');

/**
 * Creates a new user in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  User.findOne({name: req.body.name})
    .exec(function (error, foundUser) {
      if(foundUser) {
        errorHandler.handle(res, error, 500);
      } else {
        User.create(req.body, function (error, user) {
          if (error) { errorHandler.handle(res, error, 500); }
          res.status(201).json({
            user: _.omit(user.toObject(), ['passwordHash', 'salt']),
            token: authService.signToken(user._id)
          });
        }); 
      }
    })
};

/**
 * Return the current logged user.
 *
 * @param req
 * @param res
 */
exports.getMe = function (req, res) {
  User.findById({_id: req.user._id})
    .populate('_groups')
    .exec(function (error, user) {
      if (error) { errorHandler.handle(res, error, 500); }
      if (!user) { return res.json(401); }
      //This extracts user's create date from the objectId
      user.joinDate = user._id.getTimestamp();
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
  var password = req.body.password;

  User.findById(query)
  .exec(function (error, user) {
    if (error) { errorHandler.handle(res, 'Cannot Find User', 404) }
    if (!user) { return res.json(401); }
    if (req.body.name !== undefined) {
      user.name = req.body.name;
    }
    if (req.body.email !== undefined) {
      user.email = req.body.email;
    }
    if (password !== undefined) {
      user.password = password;
    }
    user.save();
    res.json(user);
  });
};

/**
 * Log workout on a day.
 *
 * @param req
 * @param res
 */
exports.logWorkout = function (req, res) {
  var query = {'_id': req.user._id};
  User.findById(query, function (error, user) {
    if (error) {
      errorHandler.handle(res, error, 500);
    } else {
      var date = req.body.date;
      user.exercises.push(date);
      user.save();
      res.json(user);
    }
  });
};

/**
 * Unlog workout on a day.
 *
 * @param req
 * @param res
 */
exports.unlogWorkout = function (req, res) {
  var query = {'_id': req.user._id};
  User.findById(query, function (error, user) {
    if (error) {
      errorHandler.handle(res, error, 500);
    } else {
      var date = req.body.date;
      var convertedDate = new Date(date).toString();
      for (var i = 0; i < user.exercises.length; i++) {
        if(convertedDate == user.exercises[i]){
          user.exercises.splice(i,1);
          user.save();
          break;
        }
      }
      res.json(user);
    }
  });
};


/**
 * Show each members logs when clicked on a member.
 *
 * @param req
 * @param res
 */
exports.showLogs = function (req, res) {
  var userId = req.params.userId;
  User.findOne({_id: userId})
    .exec(function (error, foundUser) {
      if(error){
        errorHandler.handle(res, 'user not found', 404);
      } else if(foundUser){
        res.json(foundUser.exercises);
      }
    })
  };


/**
 * Remove a member from a group as a group creator
 *
 * @param req
 * @param res
 */
exports.delete = function (req, res){
  var user = new User({_id: req.params.userId});
  user.remove(function (error, deletedUser){
    if(error){
      errorHandler.handle(res, 'user not deleted', 404);
      return;
    }
    res.status(200).json({
      user: deletedUser
    });
  });
}


