'use strict';
const express = require('express');
const router = express.Router();
const GroupController = require('../controllers').Users;

router.route('/')
  .post((req, res) => {
    console.log('in user controller')
    GroupController.checkUser(req, res);
  });

module.exports = router;
