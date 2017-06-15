

const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');

const app = express();

app.use(middleware.morgan('dev'));
app.use(middleware.bodyParser.urlencoded({ extended: false }));
app.use(middleware.bodyParser.json());

app.use(middleware.flash());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/groups', routes.groups);
app.use('/sign-login', routes.users);
app.use('/select-group', routes.selectgroup);
app.use('/email', routes.email);
app.use('/newgroup', routes.addgroup);
app.use('/getMapDetails', routes.maps);
app.use('/grouplist', routes.getgroups);
app.use('/removegroup', routes.removegroup);
app.use('/verifyProfile', routes.verifyProfile);
app.use('/saveProfile', routes.saveProfile);
app.use('/join-group', routes.joingroup);
app.use('/getuserprofile', routes.getuserprofile);
app.use('/check-destination', routes.checkdestination);

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
};

app.use(allowCrossDomain);

module.exports = app;
