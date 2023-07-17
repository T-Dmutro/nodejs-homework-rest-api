const express = require("express");

const router = express.Router();
const auth = require("../../middleware/auth");
const jsonParser = express.json();
const AutController = require("../../controllers/index");

router.post("/register", jsonParser, AutController.registered);
router.post("/login", jsonParser, AutController.login);
router.post("/logout", auth, AutController.logout);
router.get("/current", auth, AutController.current);
router.patch("/", auth, AutController.subscription);

module.exports = router;
