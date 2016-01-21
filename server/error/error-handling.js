'use strict';

var config = require('../config/environment');

exports.handle = function (res, err, status) {
  res.status(status).json({err: err});
}
