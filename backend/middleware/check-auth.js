const jwt = require("jsonwebtoken");

module.exports = (req, res, next)=>{
  console.log("outside try")
  try{
    const token = req.headers.authorization.split(" ")[1];
    const decoded_data = jwt.verify(token,"the_quick_brown_fox_jumps_over_the_lazy_dog")
    req.appUserData = {email: decoded_data.email, userId: decoded_data.userId}
    console.log(decoded_data)
    next()
  } catch(error){
    console.log(error)
    res.status(401).json({
      message: 'You are not authenticated!'
    });
  }

}
