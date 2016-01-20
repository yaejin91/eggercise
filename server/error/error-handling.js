'use strict';

var config = require('../config/environment');

exports.handle = function (res, err, status) {
  res.status(status).json({err: err});
}

//This has to be deleted after refactoring invite controller and user controller
exports.handler = function (res, err, status) {
  res.status(status).json({err: err});
}
