const User = require("../../models/usersSchema");
async function uploadAvatar(req, res, next) {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { avatar: req.file.filename },
      { new: true }
    ).select({ name: 1, email: 1, avatar: 1 });

    if (user === null) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    return next(error);
  }
}
module.exports = {
  uploadAvatar,
};
