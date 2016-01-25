'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./invite.controller');
var user = require('../user/user.controller');
var auth = require('../../auth/auth.service.js');

router.get('/accept/:invite_id', controller.showInvite);
// router.post('/accept', controller.acceptInvite);
router.post('/accept', user.create);
router.post('/create', auth.isAuthenticated(), controller.create);

module.exports = router;
