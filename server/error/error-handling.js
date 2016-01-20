'use strict';

var config = require('../config/environment');

exports.handler = function (res, err, status) {
  return res.status(status).json({err: err});
}
