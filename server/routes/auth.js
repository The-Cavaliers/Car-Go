const express = require('express');
const middleware = require('../middleware');

const router = express.Router();

router.route('/')
 .get(middleware.auth.verify, (req, res) => {  
     res.render('index.ejs');
 });

router.route('/login')
  .get((req, res) => {
    
      //res.render('login.ejs', { message: req.flash('loginMessage') });
      console.log('I am here from login', req.username, req.password);
      res.send({'success': false, 'message':req.user});
  })
  .post(middleware.passport.authenticate('local-login', {
      successRedirect: '/profile',
      failureRedirect: '/login',
      failureFlash: true
  }));

router.route('/signup')
  .get((req, res) => {
      res.render('signup.ejs', { message: req.flash('signupMessage') });

  })
  .post(middleware.passport.authenticate('local-signup', {
      successRedirect: '/profile',
      failureRedirect: '/signup',
      failureFlash: true
  }));

router.route('/profile')
//   .get(middleware.auth.verify, (req, res) => {
    //   res.render('profile.ejs', {
    //       user: req.user // get the user out of session and pass to template
    //   });
    .get( (req, res) => {
        console.log('I am here');
        res.send({'success': true, 'message':'Mahi'});
    });

router.route('/logout')
  .get((req, res) => {
      req.logout();
      res.redirect('/');
  });

router.get('/auth/google', middleware.passport.authenticate('google', {
    scope: ['email', 'profile']
}));

router.get('/auth/google/callback', middleware.passport.authenticate('google', {
    successRedirect: '/profile',
    failureRedirect: '/login'
}));

router.get('/auth/facebook', middleware.passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
}));

router.get('/auth/facebook/callback', middleware.passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/auth/twitter', middleware.passport.authenticate('twitter'));

router.get('/auth/twitter/callback', middleware.passport.authenticate('twitter', {
    successRedirect: '/profile',
    failureRedirect: '/login'
}));

router.post('/mobile', (req, res)=>{
    console.log(req.body.username);
    console.log(req.body.password);
    res.redirect('/profile');
});

module.exports = router;
