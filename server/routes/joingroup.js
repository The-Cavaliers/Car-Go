const express = require('express');

const router = express.Router();
const GroupController = require('../controllers').JoinGroup;

router.route('/')
  .post((req, res) => {
    GroupController.joinGroup(req, res);
  });

module.exports = router;
