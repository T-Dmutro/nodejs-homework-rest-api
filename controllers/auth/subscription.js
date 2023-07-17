const User = require("../../models/usersSchema");
async function subscription(req, res, next) {
    const id = req.user.id;
    console.log(id);
    const { subscription } = req.body;
    console.log(`user subscripion ${req.body.subscription}`)
     if (req.body.subscription === undefined) {
        return res.status(400).json({ message: "missing field subscription" });
      }
    //   console.log(`id : ${contactId}, subscription: ${subscription}`);
    if (req.body.subscription !== "pro" && req.body.subscription !== "starter" && req.body.subscription !=="business"){
        return res.status(400).json({ message: "the subscription field must be according to the scheme" });
    }
      try {
        const result = await User.findOneAndUpdate(
          { _id: id, },
          { subscription },
          { new: true }
        );
        // console.log(result);
        if (result === null) {
          return res.status(404).json({ message: "Contact not found" });
        }
        return res.status(200).json(result);
      } catch (error) {
        return next(error);
      }
    }
module.exports = subscription;