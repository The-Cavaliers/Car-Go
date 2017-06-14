'use strict';
const express = require('express');
const router = express.Router();
const EmailController = require('../controllers').SendEmail;

router.route('/')
  .get((req, res) => {
  })
  .post((req, res) => {
    EmailController.emailUser(req, res);
  });

module.exports = router;
