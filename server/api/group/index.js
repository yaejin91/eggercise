'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./group.controller');

router.post('/', controller.create);
// router.post('/:group_id', controller.delete);

module.exports = router;
