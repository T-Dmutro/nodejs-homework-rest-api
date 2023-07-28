const User = require("../../models/usersSchema");
const sendEmail = require("../../helpers");
const BASE_URL = process.env.BASE_URL;


async function sendVerifyLeter(req, res, next){
    const { email } = req.body
    

    if(!email){
        return res.status(404).json({ "message":"missing required field email" });
    }
    const user = await User.findOne({email :email})
    if(user.verify){
        return res.status(404).json({ "message":"Verification has already been passed" });
    }
    const verifyEmail = {
        to: email,
         subject: `Welcome on board, friend`,
        html: `<a target = "_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}" > Click here to verify email <a>`
      };
      await sendEmail(verifyEmail);
      return res.status(200).json({"message": "Verification email sent"})
}

module.exports = sendVerifyLeter;