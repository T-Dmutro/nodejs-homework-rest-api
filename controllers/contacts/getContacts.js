const Contact = require("../../models/moongoseSchema");

// отримання всіх контактів
async function getContacts(req, res, next) {
  const favorite = req.query.favorite;
console.log({favorite})
if (favorite=== "true" ){
  try {
    const contactTrue =await Contact.find({ favorite: true, ownerId: req.user.id })
    console.log(contactTrue)
    return res.json(contactTrue);
  } catch (error) {
    return next(error);
  }
}
  try {
    console.log(req.user.id)
    const contacts = await Contact.find({ ownerId: req.user.id });
    return res.json(contacts);
  } catch (error) {
    return next((error) => res.status(500).send(error));
  }
}
module.exports = getContacts;