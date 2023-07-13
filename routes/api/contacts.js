const express = require("express");
// імпорт контролерра
// const ContactController = require("../../controllers/index");
const { getContacts, getContactId, createContact, deleteContact, putContact, patchFavorite } = require("../../controllers/index");
// маршрутизація
const router = express.Router();
// змінна для парсингу json
const jsonParsers = express.json();
// отримання всіх контактів
router.get("/", getContacts);
// отримання контакта по id
router.get("/:contactId", getContactId)
// додавання контакту
router.post("/", jsonParsers, createContact);
// видалення контакту
router.delete("/:contactId", deleteContact);
// оновлення даних в контакті
router.put("/:contactId", jsonParsers, putContact);

router.patch("/:contactId", jsonParsers, patchFavorite)

module.exports = router;
