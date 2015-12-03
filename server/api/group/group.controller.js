'use strict';

var _ = require('lodash');

var Group = require('./group.model');

function handleError (res, err) {
  return res.status(500).send(err);
}

//Creates a new group in the DB.
exports.create = function (req, res) {
	Group.create(req.body, function (err, group) {
		if (err) {
			return handleError(res, err);
		} else {
			
		}
	})
}


