const express = require('express');
const router = express.Router();
const GroupController = require('../controllers').Selectgroup;

router.route('/')
  .post((req, res) => {
    // function to select group
    GroupController.selectgroup(req, res);
  });

module.exports = router;
