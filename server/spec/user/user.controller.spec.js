'use strict';

var request = require('supertest'),
  app = require('../../server'),
  agent = request.agent(app),
  User = require('../../api/user/user.model');

var auth = {};

describe('User', function() {
  describe('with data', function() {
    var user;

    beforeEach(function (done) {
      User.create({name: 'test', email: 'test@test.com', password: 'testing'}, function (error, newUser) {
        if (error) {
          done.fail(error);
        } else {
          user = newUser;
          loginUser(auth, done);
        }
      });
    })

    afterEach(function (done) {
      User.remove({name: 'test'}, function (error, removeUser) {
        if (error) {
          done.fail(error);
        } else {
          done();
        }
      });
    });

    it('should return an existing user', function (done) {
      agent
      .get('/api/users/me')
      .set('Authorization', 'Bearer ' + auth.token)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (error, res) {
        if (error) {
          done.fail(error);
        } else {
          var returnUser = res.body;
          expect(returnUser.name).toBe('test');
          done();
        }
      });
    });
  });

});

function loginUser(auth, done) {
  agent
  .post('/auth/local/')
  .send({email: 'test@test.com', password: 'testing'})
  .end(onResponse);
  function onResponse(error, res) {
    if (error) {
      throw error;
    } else {
      auth.token = res.body.token;
      agent.saveCookies(res);
      done();
    }
  }
}
