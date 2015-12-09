'use strict';

//packages and modules required
var request = require('supertest'),
  app = require('../../../server'),
  agent = request.agent(app);

//model
var Group = require('../../../api/group/group.model'),
  User = require('../../../api/user/user.model'),
  Workout = require('../../../api/workout/workout.model');

//auth
var auth = {};

//variables
var creator;

describe('Workout', function () {
	beforeAll(function (done) {
	    User.create({
	      name: 'loginDummy',
	      password: 'dummypw',
	      email: 'dummyuser@test.com'
	    }, function (error, dummyUser) {
	      if(error) {
	        console.log(error);
	        done.fail(error);
	      } else {
	        creator = dummyUser;
	        loginUser(auth, done);
	        done();
	      }
	    });
	  });

	  afterAll(function (done) {
	    User.remove({_id: creator._id}, function (error, removedCreator) {
	      if (error) {
	        done.fail(error);
	      } else {
	        done();
	      }
	    });
	  });

	  describe('with data', function () {
	  	var workout;
	  	var group;

	  	beforeEach(function (done) {
	      Group.create({
	        name: 'testGroup',
	        email: 'testGroup@test.com',
	        bet: 100,
	        start:'12-01-2015',
	        end:'12-31-2015',
	        _creator:creator._id
	      }, function (error, newGroup) {
	        if (error) {
	          console.log(error);
	          done.fail(error);
	        } else {
	          group = newGroup;
	          Workout.create({
	          	_user: creator._id,
	          	_group: group._id,
	          	log: '12-02-2015'
	          }, function (error, newWorkout) {
	          	if (error) {
	          		console.log(error);
	          		done.fail(error);
	          	} else {
	          		workout = newWorkout;
	          		done();
	          	}
	          });
	        }
	      });
	    });

	  	afterEach(function (done) {
	  	  Group.remove({_id: group._id}, function (error, removedGroup) {
	  	    if (error) {
	  	      done.fail(error);
	  	    } else {
	  	      Workout.remove({_id: workout._id}, function (error, removedWorkout) {
	  	      	if (error) {
	  	      		done.fail(error);
	  	      	} else {
	  	      		done();
	  	      	}
	  	      });
	  	    }
	  	  });
	  	});

	  	//TODO: Test if I can have multiple workout log dates
	  	//Keep in mind: Do I want to create a workout model 
	  	//							automatically on joining/creating a group?
	  	it('should create a new workout', function (done) {
	  		agent
	  		.post('/api/workouts/create')
	  		.send({
	  			_user: creator._id,
	  			_group: group._id,
	  		})
	  		.set('Authorization', 'Bearer ' + auth.token)
	  		.expect('Content-Type', /json/)
	  		.end(function (error,res) {
	  			if (error) {
	  				done.fail(error);
	  			} else {
	  				var returnedWorkout = res.body.workout;
	  				expect(returnedWorkout._user).toBe(creator._id);
	  				expect(returnedWorkout._group).toBe(group._id);
	  				Workout.findOne({ _id: returnedWorkout._id})
	  				.remove(function (error) {
	  					done();
	  				});
	  			}
	  		});
	  	});
	  });
});

//Function for fake User login
function loginUser (auth, done) {
  agent
  .post('/auth/local/')
  .send({
    email: 'dummy@test.com',
    password: 'dummypw'
  })
  .expect(200)
  .end(onResponse);

	function onResponse(error, res) {
		if(error) {
			console.log(error);
			throw error;
		} else {
			auth.token = res.body.token;
			agent.saveCookies(res);
			done();
		}
	};
};