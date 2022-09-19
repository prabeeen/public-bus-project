const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const Driver = require("../model/driver");
const Admin = require("../model/admin");
const User = require("../model/user");

router.post('/add-driver', (req, res, next)=>{
  let driver;
  bcrypt.hash(req.body.password, 10).then(hash=>{
    driver = new Driver({
      email: req.body.email,
      password: hash
    })
    driver.save().then((data)=>{
      res.status(201).json({
        message: "Successfully Added Driver!",
        data: {...data._doc}
      })
    }).catch(err=>{
      res.status(500).json({
        message: "Invalid authentication credentials!"
    })
    })
  })
})

router.post('/add-admin', (req, res, next)=>{
  let admin;
  bcrypt.hash(req.body.password, 10).then(hash=>{
    admin = new Admin({
      email: req.body.email,
      password: hash,
      name: req.body.name,
      contact: req.body.contact
    })
    admin.save().then((data)=>{
      res.status(201).json({
        message: "Successfully Added Admin!",
        data: {...data._doc}
      })
    }).catch(err=>{
      res.status(500).json({
        message: "Invalid authentication credentials!"
    })
    })
  })
})

router.post('/driver-login', (req, res, next)=>{
  let fetchedDriver;
  Driver.findOne({ email: req.body.email}).then(driver=>{
    fetchedDriver = driver;
    if(!driver){
      return res.status(401).json({
        result: false,
        message: "Authentication failed!"
      })
    }
    return bcrypt.compare(req.body.password, driver.password)
  })
  .then(result=>{
    if(!result){
      return res.status(401).json({
        result: false,
        message: "Authentication failed"
      })
    }
    if(!fetchedDriver) return;
    const token = jwt.sign(
      {email: fetchedDriver.email, driverId: fetchedDriver._id},
      "the_quick_brown_fox_jumps_over_the_lazy_dog",
      { expiresIn: "1h"}
      )
      res.status(200).json({
        user: "driver",
        result: true,
        token: token,
        userId: fetchedDriver._id,
        expiresIn: 3600
      })
  }).catch(err=>{
      res.status(401).json({
      result: false,
      message: "Invalid Authentication Credentials!"
    })
  });
})


router.post('/admin-login', (req, res, next)=>{
  let fetchedAdmin;
  Admin.findOne({ email: req.body.email}).then(admin=>{
    fetchedAdmin = admin;
    if(!admin){
      return res.status(401).json({
        result: false,
        message: "Authentication failed!"
      })
    }
    return bcrypt.compare(req.body.password, admin.password)
  })
  .then(result=>{
    if(!result){
      return res.status(401).json({
        result: false,
        message: "Authentication failed"
      })
    }
    if(!fetchedAdmin) return;
    const token = jwt.sign(
      {email: fetchedAdmin.email, driverId: fetchedAdmin._id},
      "the_quick_brown_fox_jumps_over_the_lazy_dog",
      { expiresIn: "1h"}
      )
      res.status(200).json({
        user: "admin",
        userId: fetchedAdmin._id,
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

router.get('/get-passenger', (req, res, next)=>{
  User.find({}, {_id: true, username: true, email: true, phone: true, idType: true, idNo: true}).then(data=>{
    console.log(data)
    res.status(200).json({
      message: 'Passenger retrieved successfully',
      data: data
    })
  }).catch(err=>{
    res.status(500).json({
      message: 'Passenger retrieved failed',
      err: err
    })
  })
})


router.delete('/delete-passenger/:id', (req, res, next)=>{
  User.deleteOne({_id: req.params.id}).then(result=>{
    console.log(result)
    res.status(200).json({
      message: "Successfully Deleted!"
    })
  }).catch(err=>{
    res.status(500).json({
      message: "Deletion Failed",
      err: err
    })
  })
})

router.get('/get-admin', (req, res, next)=>{
  Admin.find({}, {_id: true, name: true, email: true, contact: true}).then(data=>{
    console.log(data)
    res.status(200).json({
      message: 'Passenger retrieved successfully',
      data: data
    })
  }).catch(err=>{
    res.status(500).json({
      message: 'Passenger retrieved failed',
      err: err
    })
  })
})


router.delete('/delete-admin/:id', (req, res, next)=>{
  Admin.deleteOne({_id: req.params.id}).then(result=>{
    console.log(result)
    res.status(200).json({
      message: "Successfully Deleted!"
    })
  }).catch(err=>{
    res.status(500).json({
      message: "Deletion Failed",
      err: err
    })
  })
})


module.exports = router;
