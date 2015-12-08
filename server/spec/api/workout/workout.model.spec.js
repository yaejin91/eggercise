var mongoose = require('mongoose'),
	config = require('../../../config/environment'),
	User = require('../../../api/user/user.model'),
	Group = require('../../../api/group/group.model'),
	Workout = require('../../../api/workout/workout.model');

var dummyUser;
var	dummyGroup;

beforeAll(function (done) {
	mongoose.connect(config.mongo.uri);
	User.create({
		name:'imadummy',
		password: 'dummmypw',
		email:'dummy@test.com'
	}, function (error, newUser) {
		if (error) {
			done.fail(error);
		} else {
			dummyUser = newUser;
			Group.create({
				name:'dummyGroup',
				bet: 9999,
				_creator: dummyUser._id,
				start: '12-10-2015',
				end: '01-31-2016'
			}, function (error, newGroup) {
				if (error) {
					done.fail(error)
				} else {
					dummyGroup = newGroup;
					done();
				}
			});
		}
	});
});

afterAll(function (done) {
	Group.remove({_id: dummyGroup._id}, function (error, removedGroup) {
		if (error) {
			done.fail(error);
		} else {
			User.remove({_id: dummyUser._id}, function (error, removedUser) {
				if(error) {
					done.fail(error);
				} else {
					mongoose.disconnect(done);
					done();
				}
			});
		}
	});
});

describe ('Workout', function() {
	it('should create a new Workout log', function (done) {
		Workout.create({
			_user: dummyUser._id,
			_group: dummyGroup._id,
			log: '12-11-2015'
		}, function (error, newWorkout) {
			if (error) {
				done.fail(error)
			} else {
				expect(newWorkout).toBeDefined();
				newWorkout.remove(function (error) {
					if (error) {
						done.fail(error);
					} else {
						done();
					}
				});
			}
		});
	});
});