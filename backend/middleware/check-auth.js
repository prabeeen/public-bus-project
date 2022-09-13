const jwt = require("jsonwebtoken");

module.exports = (req, res, next)=>{
  try{
    const token = req.headers.authoriazation.split(" ")[1];
    jwt.verify(token,"the_quick_brown_fox_jumps_over_the_lazy_dog")
    next()
  } catch(error){
    res.status(401).json({
      message: 'You are not authenticated!'
    });
  }

}
