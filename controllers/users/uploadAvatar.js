
const User = require("../../models/usersSchema");
const path = require("node:path");
const fs = require("fs/promises");
const crypto = require("node:crypto");
const Jimp = require("jimp");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");
async function uploadAvatar(req, res, next) {
  const { id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const uniqueSuffix = crypto.randomUUID();
  const ext = path.extname(originalname);
  const baseName = path.basename(originalname, ext);
  const imageName = `${baseName}-${uniqueSuffix}${ext}`;

  try {
    const resultUpload = path.join(avatarDir, imageName);

    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", imageName);
    await User.findByIdAndUpdate(id, { avatarURL });
    Jimp.read(avatarURL, (err, img) => {
      if (err) throw err;
      img.resize(250, 250);
    });
    res.json({ avatarURL });
  } catch (error) {
    return next(error);
  }
}
module.exports = uploadAvatar;
