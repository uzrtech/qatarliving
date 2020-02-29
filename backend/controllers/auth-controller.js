const mongoose = require('mongoose');
const User = require('../models/user_model');
const jwt = require('jsonwebtoken'); 
const Notification = require('../models/notification-model');

exports.UserRegister = (req, res) => {
    var reqBody = req.body;
    var user = new User;
    user.name = reqBody.name;
    user.email = reqBody.email;
    user.password = reqBody.password;
    user.save().then((_user, err)=>{
      addNotification(_user.name, "New User Added");
        res.status(200).json({message: "User Registered successfully!"});
    }).catch((err)=>{
      res.status(401).json({message: "Email Exists",});
    })};

  exports.UserLogin = (req, res) => {
    const reqBody = req.body;
    User.findOne({email: reqBody.email}).then((user,err)=>
      {
        if(!user){
          return res.status(500).json({message: 'Incorrect Email'});          
        }
        if(reqBody.password != user.password)
        {
          return res.status(500).json({message: 'Incorrect Password'});
        }
        const token = jwt.sign({email:reqBody.email},'webTokenSecret',{expiresIn:'2h'});
        res.status(200).json({
          message:'login successful',token:token, _id:user._id });
      }).catch(err=>{return res.status(401).json({message: 'Cannot Find User'});})
  };

  exports.UserPasswordReset = (req, res, next) => {
    const reqBody = req.body;
    User.findOne({email: reqBody.email}).then((user,err)=>
      {res.status(200).json({
        message:'Email sent',
        });
      }).catch(err=>{
        res.status(201).json({
          message:'cannot find User',
          });
      })
  }

  exports.authcheck = (req, res, next) => {
    var token = req.headers['x-access-token'];
    if(!token){return res.status(400).send({message:'No token provided'})}
    jwt.verify(token,'',(err,decoded)=>{
    if(err){return res.status(400).send({message:'No token Verified'})};
    User.findById(decoded.id, (err, user)=>{
    if(err){return res.status(400).send({message:'Failed To find the user'})};
    if(err){return res.status(200).send({message:'User Found'})};
    })
    res.status(200).send(decoded);
    })  
  } 

  

  addNotification = (_name,_text)=>{
    var notification = new Notification({
      name, _name,
      date: new Date(),
      text: _text
    });
    notification.save((err,ress)=>{
      if(ress){
        console.log("Notidication added");
        console.log(ress);
        
      }
    })
  }