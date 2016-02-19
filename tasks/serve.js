'use strict';

/**
 * Serve app. For dev purpose.
 */

var gulp       = require('gulp');
var ripe       = require('ripe');
var nodemon    = require('gulp-nodemon');
var open       = require('gulp-open');
var bsync      = require('browser-sync');
var fs         = require('fs');

var config = require('../server/config/environment');

var openOpts = {
  uri: 'http://localhost:' + config.port,
  already: false
};

var apiPath = process.env.INIT_CWD + '/tasks/development-ignored.json';

var stats = fs.lstatSync(apiPath);
if (stats.isFile() && (process.env.NODE_ENV == 'development')) {
  var developmentEnvironmentConfig = require(apiPath);
  process.env.SENDGRID_API_KEY = developmentEnvironmentConfig.sendgridAPI;
}

module.exports = {

  nodemon: function (cb) {
    return nodemon({
        script: 'server/server.js',
        ext: 'js',
        ignore: ['client', 'dist', 'node_modules', 'gulpfile.js']
      })
      .on('start', function () {
        if (!openOpts.already) {
          openOpts.already = true;
          ripe.wait(cb);
        } else {
          ripe.wait(function () {
            bsync.reload({ stream: false });
          });
        }
      });
  },

  bsync: function () {
    bsync.init({
      proxy: 'localhost:9000',
      browser: process.env.BROWSER || 'google chrome',
      online: false,
      notify: false,
      watchOptions: {
        interval: 500
      }
    });
  }

};
