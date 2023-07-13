const Contact = require("../../models/moongoseSchema");

// отримання контакту по id

async function getContactId(req, res, next) {
    try {
      const { contactId } = req.params;
      console.log(`router.get id: ${contactId}`);
      const contact = await Contact.findById(contactId);
  
      console.log(contact);
      // відсутній потрібний користувач
      if (contact === null) {
        return res.status(404).json({ message: "Not found" });
      }
      return res.json(contact);
    } catch (error) {
      // Обробка помилки
      res.status(404).json({ message: "Not found" });
    }
  }
  module.exports = {getContactId}