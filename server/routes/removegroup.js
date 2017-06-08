'use strict';
const express = require('express');
const router = express.Router();
const RemoveGroupController = require('../controllers').RemoveGroup;

router.route('/')
  .get((req, res) => {
  })
  .post((req, res) => {
  	RemoveGroupController.remvoveGroup(req, res)
  });

module.exports = router;