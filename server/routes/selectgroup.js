const express = require('express');
const router = express.Router();
const GroupController = require('../controllers').Selectgroup;

router.route('/')
  .post((req, res) => {
    GroupController.selectgroup(req, res);
  });

module.exports = router;
