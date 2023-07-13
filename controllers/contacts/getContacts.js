const Contact = require("../../models/moongoseSchema");

// отримання всіх контактів
async function getContacts(__, res, next) {
  try {
    const contacts = await Contact.find();
    return res.json(contacts);
  } catch (error) {
    return next((error) => res.status(500).send(error));
  }
}
module.exports = getContacts;