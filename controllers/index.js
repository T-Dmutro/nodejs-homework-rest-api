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
  subscription
} = require("./auth/index");
module.exports = {
  getContacts,
  getContactId,
  creatreContact,
  deleteContact,
  putContact,
  patchFavorite,
  login,
  logout,
  registered,
  current,
  subscription
};
