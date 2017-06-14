const express = require('express');

const router = express.Router();
const SaveProfileController = require('../controllers').SaveProfile;

router.route('/')
.post((req, res) => {
  SaveProfileController.saveProfile(req, res);
});

module.exports = router;
