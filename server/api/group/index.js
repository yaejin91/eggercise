'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./group.controller');
var auth = require('../../auth/auth.service');

router.post('/create', auth.isAuthenticated(), controller.create);
router.post('/:group_id', auth.isAuthenticated(), controller.delete);
router.get('/:group_id', auth.isAuthenticated(), controller.showGroup);


module.exports = router;
