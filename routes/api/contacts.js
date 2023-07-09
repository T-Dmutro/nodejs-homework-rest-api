const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();
// змінна для парсингу json
const jsonParsers = express.json();
// схема для валідації
const contactsSchema = require("../../schemas/contacts");
// отримання всіх контактів
router.get("/", async (req, res, next) => {
  listContacts()
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send(err));
});
// отримання контакта по id
router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  console.log(`router.get id: ${contactId}`);
  try {
    const contact = await getContactById(contactId);
    res.send(contact);
  } catch (err) {
    console.error(err);

    // Обробка помилки
    res.status(404).json({ message: "Not found" });
  }
});
// додавання контакту
router.post("/", jsonParsers, async (req, res, next) => {
  const responce = contactsSchema.validate(req.body);
  console.log(responce);
  if (typeof responce.error !== "undefined") {
    return res.status(400).json({ message: "missing required name field" });
  }
  addContact({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  }).then((data) => res.status(201).send(data));
});
// видалення контакту
router.delete("/:contactId", async (req, res, next) => {
  console.log({ params: req.params.contactId });
  const { contactId } = req.params;
  try {
    await removeContact(contactId);
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
});
// оновлення даних в контакті
router.put("/:contactId", async (req, res, next) => {
  console.log({ params: req.params.contactId });
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const responce = contactsSchema.validate(req.body);
  if (typeof responce.error !== "undefined") {
    return res.status(400).json({ message: "missing fields" });
  }
  try {
    const update = await updateContact(contactId, { name, email, phone });
    res.status(200).send(update);
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
