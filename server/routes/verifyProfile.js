const express = require('express');

const router = express.Router();
const VerifyProfileController = require('../controllers').VerifyProfile;

router.route('/')
.post((req, res) => {
  VerifyProfileController.verifyProfile(req, res);
});

module.exports = router;
