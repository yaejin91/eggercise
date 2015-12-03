'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./group.controller');

router.post('/', controller.create);

module.exports = router;
