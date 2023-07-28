const {
  getContacts,
  getContactId,
  creatreContact,
  deleteContact,
  putContact,
  patchFavorite,
  
} = require("./contacts/index");
const {
  login,
  logout,
  registered,
  current,
  subscription,
  verifyToken,
  sendVerifyLeter
} = require("./auth/index");
const {
  uploadAvatar,
  getById,
}= require("./users/index")
module.exports = {
  getContacts,
  getContactId,
  verifyToken,
  sendVerifyLeter,
  creatreContact,
  deleteContact,
  putContact,
  patchFavorite,
  login,
  logout,
  registered,
  current,
  subscription,
  uploadAvatar,
  getById,
};
