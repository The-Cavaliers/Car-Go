const express = require('express');

const router = express.Router();
const SaveProfileController = require('../controllers').SaveProfile;

router.route('/')
.post((req, res) => {
  console.log('in the save profile', req.body);
  SaveProfileController.saveProfile(req, res);
});

module.exports = router;
