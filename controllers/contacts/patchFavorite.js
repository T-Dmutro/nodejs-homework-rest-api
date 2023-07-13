const Contact = require("../../models/moongoseSchema");

async function patchFavorite(req, res, next) {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (req.body.favorite === undefined) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  console.log(`id : ${contactId}, favorite: ${favorite}`);
  try {
    const result = await Contact.findOneAndUpdate(
      { _id: contactId },
      { favorite },
      { new: true }
    );
    console.log(result);
    if (result === null) {
      return res.status(404).json({ message: "Contact not found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}
module.exports =  patchFavorite;
