const User = require("../../models/usersSchema");

async function logout(req, res, next) {

  try {
    await User.updateOne({ _id: req.user.id }, { $set: { token: null } });

    return res.status(204).end()
  } catch (error) {
    return next(error);
  }
}
module.exports = logout;
