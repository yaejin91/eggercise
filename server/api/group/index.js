'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./group.controller');

router.post('/create', controller.create);

module.exports = router;
