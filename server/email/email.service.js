// using SendGrid's Node.js Library - https://github.com/sendgrid/sendgrid-nodejs
var config = require('../config/environment');
var sendgrid  = require('sendgrid')(config.sendgrid_api_key);

exports.send = function (emailTo, subject, emailText, callback) {
var result;

  sendgrid.send({
    to:       emailTo,
    from:     'team@eggercise.com',
    subject:  subject,
    text:     emailText
  }, callback);

  console.log('This is result: ', result);
  return result;
}

function handleSuccess(res, message) {

}
