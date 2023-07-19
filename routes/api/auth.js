const express = require("express");
const router = express.Router();
const { auth, upload } = require("../../middleware/index"); // upload
const jsonParser = express.json();
const AutController = require("../../controllers/index");
// реєстрація користувача
router.post("/register", jsonParser, AutController.registered);
// авторизація
router.post("/login", jsonParser, AutController.login);
// вихід з системи
router.post("/logout", auth, AutController.logout);
// статус користувача
router.get("/current", auth, AutController.current);
// зміна ролі користувача
router.patch("/", auth, AutController.subscription);
// пошук користувачав за id
router.get("/:id", auth, AutController.getById);
// завантаження файлу аватарки користувача
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  AutController.uploadAvatar
);

module.exports = router;
