'use strict';

const express = require('express');

const router = express.Router();
const AddGroupController = require('../controllers').Addgroup;

router.route('/')
  .post((req, res) => {
    AddGroupController.saveGroup(req, res);
    res.status(201);
  });

module.exports = router;
