var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const mongoose  = require('mongoose');
const User = require('../models/user');
var passport = require('passport');
const cors = require('./cors');
var authenticate = require('../authenticate');

router.use(bodyParser.json());
/* GET users listing. */
router.get('/',cors.corsOptions,authenticate.verifyUser,authenticate.verifyAdmin,function(req, res, next) {
  User.find({})
  .then((users)=>{
    res.sendStatus = 200;
    res.setHeader('Content-Type','application/json');
    res.json(users);
  },(err)=>next(err))
  .catch((err)=>next(err));
})

router.get('/facebook/token', passport.authenticate('facebook-token'), (req, res) => {
  if (req.user) {
    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, status: 'You are successfully logged in!'});
  }
});

// using passport


router.post('/signup',cors.corsOptions, (req, res, next) => {
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      if (req.body.firstname)
        user.firstname = req.body.firstname;
      if (req.body.lastname)
        user.lastname = req.body.lastname;
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
        }
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful!'});
        });
      });
    }
  });
});

router.post('/login',cors.corsOptions,passport.authenticate('local'),(req,res)=>{
  var token = authenticate.getToken({_id : req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type','application/json');
  res.json({success : true,token : token,status: 'You are successfully logged in'});  
})


// Using Session 
/*
router.post('/signup',(req,res,next)=>{
    User.findOne(req.body.username)
    .then((user)=>{
      if(user!=null){
        var err = new err("User "+req.body.username+" already exist!");
        err.status = 403;
        next(err);
      }
      else{
        return User.create({
          username : req.body.username,
          password : req.body.password
        })
      }
    })
    .then((user)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json({status : 'Registration Successfull',user : user})
    })
    .catch((err)=>next(err))
});

router.post('/login',(req,res,next)=>{
  if(!req.session.user){
    var authHeader = req.headers.authorization;
    if(!authHeader){
      var err = new Error("You are not authenticated!");
      res.setHeader('WWW-Authenticate','Basic');
      err.status=401;
      next(err);
      return;
    }
      var auth = new Buffer.from(authHeader.split(" ")[1],'base64').toString().split(":");
      var username = auth[0];
      var password = auth[1];
      User.findOne({username : username})
      .then((user)=>{
        if(user==null){
          const err = new Error('User '+username+' does not exist');
          err.status=403;
          return next(err)
        }
        else if(user.password != password){
          const err = new Error('Incorrect Password');
          err.status=403;
          return next(err)
          
        }
        else if(user.username == username && user.password == password){
          req.session.user = 'aithenticated';
          res.statusCode = 200;
          res.setHeader('Content-Type','text/plain');
          res.end('You are Authenticated');
        }
    
  
}).catch ((err) => next(err));
  }
  else{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    res.end('You are authenticated');
  }
})
*/

router.get('/logout',(req,res)=>{
  if(req.session){
  req.session.destroy();
  res.clearCookie('session-id');
  res.redirect('/');
  }
  else{
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
})

module.exports = router;
