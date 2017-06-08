'use strict';
const express = require('express');
const router = express.Router();
const GetGroupsController = require('../controllers').GetGroups;

router.route('/')
  .get((req, res) => {
  })
  .post((req, res) => {
  	console.log('in route')
  	GetGroupsController.getGroups(req, res)
  });

module.exports = router;