const User = require("../../models/usersSchema");

async function verifyToken(req, res, next) {
    const { verificationToken } = req.params;
  console.log({verificationToken})
    try {
      const user = await User.findOne({ verificationToken: verificationToken });
  
      if (user === null) {
        return res.status(404).json({ message: "User not found" });
      }
  
      await User.findByIdAndUpdate(user._id, {
        verify: true,
        verificationToken: null,
      });
  
      return res.status(200).json({ message: "Verification successful" });
    } catch (error) {
      return next(error);
    }
  }

module.exports= verifyToken;