var request = require('supertest'),
  EmailService = require('../../email/email.service'),
  User = require('../../api/user/user.model'),
  app  = require('../../server');

describe('Email service', function() {

  it('should send an email to the invitee', function (done) {
    expect(EmailService.send('mariprojects@gmail.com', 'You are awesome', 'You are awesomer')).toBe({ message: 'success'});
    done();
  })

  function checkResult () {

  }

  // it('should not send an email to the invitee', function (done) {
  //   request(app)
  //   .send({
  //     email: 'test@test2.com',
  //     password: 'wrong'
  //   })
  //   .expect('Content-Type', /json/)
  //   .expect(404)
  //   .end(function(err, res){
  //     expect(err).toBeDefined();
  //     done();
  //   });
  // });
});
