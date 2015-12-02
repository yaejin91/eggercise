'use strict';

var request = require('supertest'),
  // app = require('../../../server'),
  agent = request.agent(),
  User = require('../../api/user/user.model');

describe('User', function() {
  describe('with data', function() {
    var user;

    beforeEach(function (done) {
      User.save({name: 'test', email: 'test@test.com', password: 'testing'}, function (error, newUser) {
        console.log(error);
        console.log(newUser);
        if (error) {
          done.fail(error);
        } else {
          user = newUser;
          done();
        }
      });
    })
    });

    afterEach(function (done) {
      User.remove({name: 'test'}, function (error, removeUser) {
        if (error) {
          console.log(error);
          done.fail(error);
        } else {
          done();
        }
      });
    });

    it('should return an existing user', function (done) {
      console.log('running test');
      done();
      // request()
      // .get('/me')
      // .expect('Content-Type', /json/)
      // .expect(200)
      // .end(function (error, res) {
      //   if (error) {
      //     console.log(error);
      //     done.fail(error);
      //   } else {
      //     console.log(res.body);
      //     expect(res.body.length).toEqual(1);
      //     returnUser = res.body[0];
      //     expect(returnUser.name).toBe('test');
      //     done();
        // }
      // });
  });
})

function loginUser(auth) {
  return function (done) {
    request(server)
  }
}
