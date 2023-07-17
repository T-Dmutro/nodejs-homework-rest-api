const Contact = require("../../models/moongoseSchema");

// редагування контакту
async function putContact(req, res, next) {
  const { contactId } = req.params;
  const { name, email, phone, favorite } = req.body;
  try {
    const result = await Contact.findByIdAndUpdate({ _id: contactId, ownerId: req.user.contactId }, {
      name,
      email,
      phone,
      favorite,
    });
    if (result === null) {
      return res.status(404).json({ message: "Contact not found" });
    }
    return res.end();
  } catch (error) {
    return next(error);
  }
}
module.exports =  putContact;
