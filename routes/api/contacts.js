const express = require("express");
// імпорт контролерра
const ContactController = require("../../controllers/contact");
// маршрутизація
const router = express.Router();
// змінна для парсингу json
const jsonParsers = express.json();
// отримання всіх контактів
router.get("/", ContactController.getContacts);
// отримання контакта по id
router.get("/:contactId", ContactController.getContactId)
// додавання контакту
router.post("/", jsonParsers, ContactController.creatreContact);
// видалення контакту
router.delete("/:contactId", ContactController.deleteContact);
// оновлення даних в контакті
router.put("/:contactId", jsonParsers, ContactController.putContact);

router.patch("/:contactId", jsonParsers, ContactController.patchFavorite)

module.exports = router;
