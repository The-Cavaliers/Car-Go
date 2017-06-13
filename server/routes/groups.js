'use strict';
const express = require('express');
const router = express.Router();
const GroupController = require('../controllers').Profiles;

router.route('/')
  .get((req, res) => {
  })
  .post((req, res) => {
    GroupController.checkDestinations(req, res);
  });

module.exports = router;
