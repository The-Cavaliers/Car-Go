'use strict';
const express = require('express');
const router = express.Router();
const GroupController = require('../controllers').Maps;
router.route('/')
  .get((req, res) => {
    GroupController.getMapPins(req, res);
  });

module.exports = router;