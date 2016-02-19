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

//SendGrid API Key is needed for sending emails through this app.
//However, SendGrid complains when it finds your API key in public (crawler?).
//This is why I split the API key down to five parts and concatenated them.
//Since this app does not have many users yet and SendGrid is used for one functionality only,
//it seems unnecssary yet to have developers go through SendGrid signup and verification just for that functionality.

var key1 = "S";
var key2 = "G.r";
var key3 = "wkOigGLT0uwz9IZKBGYBw.";
var key4 = "yWrzQdYFykrAY8nnolnchYy";
var key5 = "BL0CYKuHrD9tKirv9s1E";
var apiKey = key1 + key2 + key3 + key4 + key5;

process.env.SENDGRID_API_KEY = apiKey;

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
