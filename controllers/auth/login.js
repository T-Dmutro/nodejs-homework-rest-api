const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const User = require("../../models/usersSchema");

async function login(req, res, next) {
    const { email, password, subscription } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (user === null) {
        return res
          .status(401)
          .json({  "message": "Email or password is wrong" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (isMatch === false) {
        return res
          .status(401)
          .json({ "message": "Email or password is wrong"});
      }
  
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
  
      await User.updateOne({ _id: user._id }, { $set: { token } });
  // console.log(token)
      return res.status(200).json({
        "token" : token,
        "user":{
          "email":email,
          "subscription": subscription
        }
      });
    } catch (error) {
      return next(error);
    }
  }
  
  module.exports=login;