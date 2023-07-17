const express = require("express");
const auth = require("../../middleware/auth");

const authRoutes = require("./auth");
const contactsRouter = require("./contacts");
const router = express.Router();

// /api
router.use("/users",authRoutes);
router.use("/contacts", auth,  contactsRouter);


module.exports = router;