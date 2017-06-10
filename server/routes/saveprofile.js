'use strict';
const express = require('express');
const router = express.Router();
const SaveProfileController = require('../controllers').SaveProfile;

router.route('/')
  .get((req, res) => {
  })
  .post((req, res) => {
  	console.log('in the save users', req.body)
  	SaveProfileController.saveProfile(req, res)
  });

module.exports = router;