// додавання контакту
const Contact = require("../../models/moongoseSchema");
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
module.exports = creatreContact;
