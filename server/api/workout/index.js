'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./workout.controller');
var auth = require('../../auth/auth.service');

router.post('/create', auth.isAuthenticated(), controller.create);

module.exports = router;
