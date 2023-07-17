const mongoose = require("mongoose");
// const Schema = require("./usersSchema")

const contactsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    ownerId: {
      type: mongoose.Types.ObjectId,
      require: true
      // ref: 'user',
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Contact", contactsSchema);
