'use strict';
const app = require('./app');
const db = require('../db');
const PORT = process.env.port || 3001;

app.listen(PORT, () => {
  console.log('GoCar listening on port 3000!');
});
