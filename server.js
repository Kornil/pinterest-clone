var express = require('express');
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;

var port = process.env.PORT || 3000;

passport.use(new Strategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: "https://pinterest-kornil.herokuapp.com/login/twitter/return"
  },
  function(token, tokenSecret, profile, cb) {
    return cb(null, profile);
  }));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Create a new Express application.
var app = express();
var mongoose = require('mongoose');
var apiController = require('./controllers/apiController');

// Configure view engine to render EJS templates.
app.use('/assets', express.static(__dirname + '/assets'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_DATABASE);
var Image = require('../models/imageModel');
apiController(app);

// Define routes.
app.get('/',
  function(req, res) {
    res.render('home', { user: req.user });
  });

app.get('/login',
  passport.authenticate('twitter'));

app.get('/login/twitter/return', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/profile');
  });

app.get('/index', function(req, res){
  res.redirect('/');
})

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    Image.find({}, function(err, images){
      if (err) throw err;      
        res.render('/profile', { user: req.user, images: images});
    })
  });

app.listen(port);
