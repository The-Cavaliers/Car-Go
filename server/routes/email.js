'use strict';
const express = require('express');
const router = express.Router();

router.route('/')
  .get((req, res) => {
  })
  .post((req, res) => {
    console.log('posting email')
  });

module.exports = router;