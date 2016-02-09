'use strict';

var path = require('path');
var _ = require('lodash');

var all = {

  env: process.env.NODE_ENV || 'development',
  root: path.normalize(__dirname + '/../../..'),
  port: process.env.PORT || 9000,

  sendgrid_api_key: process.env.SENDGRID_API_KEY || '',

  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  secrets: {
    session: process.env.SESSION_SECRET || 'secretKey'
  }
};

console.log('process.env: ',process.env);

//This is undefined because process.env does not have any attribute
//called SENDGRID_API_KEY
console.log('api key: ',process.env.SENDGRID_API_KEY);

module.exports = _.merge(all, require('./' + all.env + '.js'));
