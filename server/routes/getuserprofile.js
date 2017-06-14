'use strict';
const express = require('express');
const router = express.Router();
const GetUserProfileController = require('../controllers').GetUserProfile;

router.route('/')
  .get((req, res) => {
  })
  .post((req, res) => {
    GetUserProfileController.getProfile(req, res);
  });

module.exports = router;