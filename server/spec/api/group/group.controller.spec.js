'use strict';

//supertest
var request = require('supertest');

//model
var Group = require('../../../api/group/group.model'),
	User = require('../../../api/user/user.model');

//auth
var auth = {};

//variables
var creator;

beforeAll();
	
describe('Group', function() {

	describe('with data', function() {
		var group;

		beforeEach(function (done) {
			Group.create({
				name: 'testGroup',
				email: 'testGroup@test.com',
				bet: 100,
				start:'12-01-2015',
				end:'12-31-2015',
				_creator:'dummyCreatorId'
			}, function (error, newGroup) {
				if (error) {
					console.log(error);
					done.fail(error);
				} else {
					group = newGroup;
					done();
				}
			});
		});

		afterEach(function (done) {
			Group.remove({_id: group._id}, function (error, removedGroup) {
				if (error) {
					done.fail(error);
				} else {
					done();
				}
			});
		});

	// 	it('should create a new group', function (done) {
	// 		var creatorId = creator._id;

	// 		request()
	// 		.post('/api/groups/create')
	// 		.send({
	// 			name:'testGroupCreate',
	// 			email: 'create@test.com',
	// 			bet: 9000,
	// 			start:'01-01-2016',
	// 			end: '01-31-2016',
	// 			_creator: creatorId
	// 		})
	// 		.expect('Content-Type', /json/)
	// 		.end(function (error, res) {
	// 			if (error) {
	// 				done.fail(error);
	// 			} else {
	// 				returnedGroup = res.body;
	// 				expect(returnedGroup.name).toBe('testGroupCreate');
	// 				Group.findOne({ _id: returnedGroup._id})
	// 				.remove(function (error) {
	// 					done();
	// 				})
	// 			}
	// 		});
	// 	});
	});

});

function loginUser (auth) {
	return function (done) {
		request()
		.post('/auth')
		.send({
			name: 'loginDummy',
			password: 'dummyPw'
		})
		.expect(200)
		.end(onResponse);

		function onResponse(error, res) {
			auth.token = res.body.token;
			return done();
		}
	}
	return done();
}

function userCreator () {
	return function (done) {
		User.create({
			name: 'loginDummy',
			password: 'dummyPw',
			email: 'dummy@test.com'
		}, function (error, dummyUser) {
			if(err) {
				console.log(error);
				done.fail(error);
			} else {
				creator = dummyUser;
				done();
			}
		})
		
	}
	return done();
}