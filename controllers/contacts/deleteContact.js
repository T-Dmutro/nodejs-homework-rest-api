const Contact = require("../../models/moongoseSchema");

// видалення контакту
async function deleteContact(req, res, next) {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (result === null) {
      return res.status(404).json({ message: "Contact not found" });
    }
    console.log(result);
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};
module.exports = deleteContact;