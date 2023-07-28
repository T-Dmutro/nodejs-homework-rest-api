const User = require("../../models/usersSchema");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const crypto = require ( "node:crypto" );
const sendEmail = require("../../helpers");
const BASE_URL = process.env.BASE_URL;

async function registered(req, res, next) {
  const { name, email, password, subscription } = req.body;
  const avatar = gravatar.url(email);
  const verificationToken = crypto.randomUUID();
  console.log({BASE_URL})
  try {
    const user = await User.findOne({ email });

    if (user !== null) {
      return res.status(409).json({ message: "Email in use" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: passwordHash, avatar, verificationToken });
    console.log({verificationToken})
    // надсилання емейл користувачу
    const verifyEmail = {
      to: email,
       subject: `Welcome on board, friend`,
      html: `<a target = "_blank" href="${BASE_URL}/api/users/verify/${verificationToken}" > Click here to verify email <a>`
    };
    await sendEmail(verifyEmail);

    return res.status(201).json({
      user: {
        email: email,
        subscription: subscription,
      },
    });
  } catch (error) {
    return next(error);
  }
}
module.exports = registered;
