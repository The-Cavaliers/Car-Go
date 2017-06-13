'use strict';
const express = require('express');
const router = express.Router();
const RemoveGroupController = require('../controllers').RemoveGroup;

router.route('/')
  .post((req, res) => {
    RemoveGroupController.removeGroup(req, res);
  });

module.exports = router;
