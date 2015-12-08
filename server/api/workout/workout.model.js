'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema for Workout
var WorkoutSchema = new Schema({
	_user: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
	_group: { type: mongoose.Schema.Types.ObjectId, ref:'Group', required: true },
	log: [{ type: Date, required: true}]
});

module.exports = mongoose.model('Workout', WorkoutSchema);