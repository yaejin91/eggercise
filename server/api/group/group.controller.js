'use strict';

var _ = require('lodash');

var Group = require('./group.model'),
	User = require('../user/user.model');

function handleError (res, err) {
	return res.status(500).send(err);
}

//Creates a new group in the DB.
//TODO: should return new group created with the attributes.
exports.create = function (req, res) {
	var creatorId = req.params.creatorId;
	// var group = new Group ({
	// 	name: req.body.name,
	// 	bet: req.body.bet,
	// 	start: req.body.start,
	// 	end: req.body.end,
	// 	_creator: creatorId
	// });

	// group.save(function (error, data) {
	// 	if (data) {
	// 		User.findOne({_id: creatorId}, function (error, user){
	// 			if (error) {
	// 				return handleError(error, error);
	// 			} else {
	// 				var id = mongoose.Types.ObjectId(user._id);
	// 				user.groups.push(id)
	// 				user.save()
	// 				res.json(data)
	// 			}
	// 		});
	// 	} else if (error) {
	// 			console.error(error.stack);
	// 			return handleError(error, error);
	// 	}
	// });

	Group.create(req.body, function (err, createdGroup) {
		if (err) {
			return handleError(res, err);
		}
		res.status(201).json({
			group: createdGroup
		});
	});
}

//Delete a group
exports.delete = function (req, res){
	var group = new Group({_id: req.params.group_id});
	group.remove( function (err, deletedGroup){
	    if(err){
	        return handleError(err, err);
	    }
	    res.status(400).json({
	        group: deletedGroup
	    });
	});
}