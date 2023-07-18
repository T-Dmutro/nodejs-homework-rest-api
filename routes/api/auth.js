const express = require("express");

const router = express.Router();
const auth = require("../../middleware/auth");
const jsonParser = express.json();
const AutController = require("../../controllers/index");

const path = require("node:path");
const multer = require("multer");
const crypto = require("node:crypto");
const storage = multer.diskStorage({
  destination: function (__, ___, cb) {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = crypto.randomUUID(); // 560fc0fd-8092-41ad-ab08-bb6094071f09
    // file.originalname: TrevorPhilips-GTAV.png
    const ext = path.extname(file.originalname); // .png
    const baseName = path.basename(file.originalname, ext); // TrevorPhilips-GTAV

    cb(null, `${baseName}-${uniqueSuffix}${ext}`); // TrevorPhilips-GTAV-560fc0fd-8092-41ad-ab08-bb6094071f09.png
  },
});

const upload = multer({ storage, limits: { fileSize: 1000000 } }); // 1 MB

router.post("/register", jsonParser, AutController.registered);
router.post("/login", jsonParser, AutController.login);
router.post("/logout", auth, AutController.logout);
router.get("/current", auth, AutController.current);
router.patch("/", auth, AutController.subscription);
// router.get("/:id", auth, AutController.getById);
router.patch("/avatars", auth,  upload.single("image"), AutController.uploadAvatar);




module.exports = router;
