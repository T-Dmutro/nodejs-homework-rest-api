const express = require("express");
const path = require("node:path");
const logger = require("morgan");
const cors = require("cors");

require("./db");

// const contactsRouter = require("./routes/api/contacts");
// const authRouter = require("./routes/api/auth");
const routes = require("./routes/api/index");
const morgan = require("morgan");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(morgan("combined"));
// app.use("/api/contacts",auth, contactsRouter);
// app.use("/api/auth", authRouter);
app.use("/api", routes);

app.use((__, res, ___) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
