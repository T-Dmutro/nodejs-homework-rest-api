const Contact = require("../models/moongoseSchema");

// отримання всіх контактів
async function getContacts(__, res, next) {
  try {
    const contacts = await Contact.find();
    return res.json(contacts);
  } catch (error) {
    return next((error) => res.status(500).send(error));
  }
}
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
// додавання контакту
async function creatreContact(req, res, next) {
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite,
  };
  console.log(contact);
  try {
    const result = await Contact.create(contact);
    console.log(result);
    return res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
}
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
}
// редагування контакту
async function putContact(req, res, next) {
  const { contactId } = req.params;
  const { name, email, phone, favorite } = req.body;
  try {
    const result = await Contact.findByIdAndUpdate(contactId, {
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

async function patchFavorite(req, res, next) {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (req.body.favorite === undefined) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  console.log(`id : ${contactId}, favorite: ${favorite}`);
  try {
    const result = await Contact.findOneAndUpdate(
      { _id: contactId },
      { favorite },
      { new: true }
    );
    console.log(result);
    if (result === null) {
      return res.status(404).json({ message: "Contact not found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}
module.exports = {
  getContacts,
  getContactId,
  creatreContact,
  deleteContact,
  putContact,
  patchFavorite,
};
