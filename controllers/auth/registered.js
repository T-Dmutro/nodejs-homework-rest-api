const User = require("../../models/usersSchema")
const bcrypt = require("bcrypt");
async function registered(req, res, next) {
    const { name, email, password, subscription } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (user !== null) {
        return res.status(409).json({  "message": "Email in use" });
      }
  
      const passwordHash = await bcrypt.hash(password, 10);
  
      await User.create({ name, email, password: passwordHash });
  
      return res.status(201).json({ 
      "user": {
        "email": email,
        "subscription": subscription
      } });
    } catch (error) {
      return next(error);
    }
  };
  module.exports = registered;