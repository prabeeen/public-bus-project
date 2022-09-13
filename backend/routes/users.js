const express = require("express");
const router = express.Router();
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

const User = require("../model/user");

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if(isValid){
      error = null;
    }
    cb(error, "images");
  },

  filename: (req, file, cb) =>{
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
})


router.post("/signup", multer({storage: storage}).single("idImage"),(req, res, next)=>{
  let user;
  if(req.body.idType){
    const url = req.protocol + '://' + req.hostname + ':3001';
    bcrypt.hash(req.body.password, 10).then(hash=>{
      user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        phone: Number(req.body.phone),
        address: req.body.address,
        idType: req.body.idType,
        idImagePath: url + '/backend/images/' + req.file.filename,
        idNo: req.body.idNo
      })
      user.save().then((data)=>{
        res.status(201).json({
          message: "successfully signed up!",
          data: {...data._doc}
        })
      }).catch(err=>{
        res.status(500).json({
            message: "Invalid authentication credentials!"
        })
      })
    })
  }
  else{
    bcrypt.hash(req.body.password, 10).then(hash=>{

      user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        phone: req.body.phone,
        address: req.body.address,
        idType: null,
        idImagePath: null,
        idNo: null
      })
      user.save().then((data)=>{
        res.status(201).json({
          message: "successfully signed up!",
          data: {...data._doc}
        })
      }).catch(err=>{
        res.status(500).json({
          message: "Invalid Authentication credentials!"
        })
      })
    })
  }

})

router.post("/login", (req, res, next)=>{
  let fetchedUser;
  User.findOne({ email: req.body.email}).then(user=>{
    fetchedUser = user;
    if(!user){
      return res.status(401).json({
        result: false,
        message: "Authentication failed!"
      })
    }
    return bcrypt.compare(req.body.password, user.password)
  })
  .then(result=>{
    if(!result){
      return res.status(401).json({
        result: false,
        message: "Authentication failed"
      })
    }
    if(!fetchedUser) return;
    const token = jwt.sign(
      {email: fetchedUser.email, userId: fetchedUser._id},
      "the_quick_brown_fox_jumps_over_the_lazy_dog",
      { expiresIn: "1h"}
      )
      res.status(200).json({
        result: true,
        token: token,
        expiresIn: 3600
      })
  }).catch(err=>{
      res.status(401).json({
      result: false,
      message: "Invalid Authentication Credentials!"
    })
  });

})

module.exports = router


