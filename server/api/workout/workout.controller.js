'use strict';

var _ = require('lodash'),
	mongoose = require('mongoose');

var Workout = require('./workout.model'),
	User = require('../user/user.model'),
	Group = require('../group/group.model');

function handleError (res, err) {
	return res.status(500).send(err);
}

//Creates a new workout
exports.create = function (req, res) {
	var userId = req.user._id;
	var groupId = req.group._id;
	var workout = new Workout({
		_user: userId,
		_group: groupId
	});

	workout.save(function (error,data) {
		
	})
}