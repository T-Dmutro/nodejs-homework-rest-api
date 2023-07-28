const jwt = require("jsonwebtoken");

const User = require("../models/usersSchema");

// const crypto = require ( 'crypto' );

const JWT_SECRET = process.env.JWT_SECRET;

function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (typeof authHeader !== "string") {
    return res.status(401).json({ message: "Not authorized" });
  }

  const [bearer, token] = authHeader.split(" ", 2);

  if (bearer !== "Bearer") {
    return res.status(401).json({ message: "Not authorized" });
  }

  jwt.verify(token, JWT_SECRET, async (err, decode) => {
    if (err) {
      if (
        err.name === "TokenExpiredError" ||
        err.name === "JsonWebTokenError"
      ) {
        return res.status(401).json({ message: "Not authorized" });
      }

      return next(err);
    }

    try {
      const user = await User.findOne({ token: token });

      if (user === null) {
        return res.status(401).json({ message: "Not authorized" });
      }
      if (user.verify !== true) {
        return res.status(401).json({ error: "Token Expired" });
      }
      req.user = { id: user._id, email: user.email,  subscription: user. subscription, verificationToken: user.verificationToken, verify: user.verify };
      console.log({ id: user._id, email: user.email, subscription: user. subscription });
      next();
    } catch (error) {
      return next(error);
    }
  });
}

module.exports = auth;
