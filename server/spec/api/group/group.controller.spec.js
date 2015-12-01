'use strict';

//supertest
var request = require('supertest');

//model
var Group = require('../../../api/group/group.model');
	
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

		it('should return an existing group', function (done) {
			request()
			.get('/api/group/'+group._id)
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function (error,res){
				if (error) {
					done.fail(error);
				} else {
					console.log('I reached');
					console.log(res.body);
					expect(res.body.length).toEqual(1);
					returnedGroup = res.body[0];
					expect(returnedGroup.name).toBe('testGroup');
					done();
				}
			})
		})

	});

})