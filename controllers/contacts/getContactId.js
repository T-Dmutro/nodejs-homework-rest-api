const Contact = require("../../models/moongoseSchema");

// отримання контакту по id

async function getContactId(req, res, next) {
  try {
    const { contactId } = req.params;

    // console.log(`router.get id: ${contactId}`);
    // console.log(`router.get ownerID: ${req.params.ownerId}`);
    const contact = await Contact.findOne({
      _id: contactId,
      ownerId: req.user.id,
    });

    // відсутній потрібний користувач
    if (contact === null) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json(contact);
  } catch (error) {
    // Обробка помилки
    res.status(404).json({ message: "Not found!" });
  }
}
module.exports = getContactId;
