// const fs = require('fs');
// const path = require("node:path");
// const crypto = require("node:crypto");
// const multer = require("multer");
// const avatarDir = path.join(__dirname, "../../../","public", "avatars");
// if (!fs.existsSync(avatarDir)) {
//   fs.mkdirSync(avatarDir);
// }
// const {path: tempload, originalname}= req.file;
// const resultUpload = path.join(avatarDir, originalname)
//  fs.rename(tempload, resultUpload);

// const tmpPath = path.join(__dirname, '../../', 'tmp');
// // Створення папки, якщо вона не існує
// if (!fs.existsSync(tmpPath)) {
//   fs.mkdirSync(tmpPath);
// }

// const storage = multer.diskStorage({
//   destination: function (__, ___, cb) {
//     cb(null, path.join(__dirname, '../../', 'tmp'));
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = crypto.randomUUID(); // 560fc0fd-8092-41ad-ab08-bb6094071f09
//     // file.originalname: TrevorPhilips-GTAV.png
//     const ext = path.extname(file.originalname); // .png
//     const baseName = path.basename(file.originalname, ext); // TrevorPhilips-GTAV

//     cb(null, `${baseName}-${uniqueSuffix}${ext}`); // TrevorPhilips-GTAV-560fc0fd-8092-41ad-ab08-bb6094071f09.png
//   },
// });

// const express = require("express");
// const path = require("node:path");
// const router = express.Router();
// const auth = require("../../middleware/auth");
// const jsonParser = express.json();
// const AutController = require("../../controllers/index");
// const fs = require("fs");
// const crypto = require("node:crypto");
// const multer = require("multer");

// const avatarDir = path.join(__dirname, "../../", "public/avatars");
// const tmpPath = path.join(__dirname, "../../", "tmp");

// // Створення папки, якщо вона не існує
// if (!fs.existsSync(tmpPath)) {
//   fs.mkdirSync(tmpPath);
// }

// function moveFile(sourcePath, destinationPath, cb) {
//   fs.rename(sourcePath, destinationPath, function (err) {
//     if (err) {
//       console.error("Помилка при перенесенні файлу:", err);
//       cb(err);
//     } else {
//       console.log("Файл успішно перенесено");
//       cb(null);
//     }
//   });
// }

// const storage = multer.diskStorage({
//   destination: function (__, ___, cb) {
//     cb(null, path.join(__dirname, "../../", "tmp"));
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = crypto.randomUUID();
//     const ext = path.extname(file.originalname);
//     const baseName = path.basename(file.originalname, ext);

//     const sourcePath = path.join(tmpPath, `${baseName}-${uniqueSuffix}${ext}`);
//     const destinationPath = path.join(
//       avatarDir,
//       `${baseName}-${uniqueSuffix}${ext}`
//     );

//     moveFile(sourcePath, destinationPath, function (err) {
//       if (err) {
//         cb(err);
//       } else {
//         cb(null, `${baseName}-${uniqueSuffix}${ext}`);
//       }
//     });
//   },
// });

// const upload = multer({ storage, limits: { fileSize: 1000000 } });

// router.post("/register", jsonParser, AutController.registered);
// router.post("/login", jsonParser, AutController.login);
// router.post("/logout", auth, AutController.logout);
// router.get("/current", auth, AutController.current);
// router.patch("/", auth, AutController.subscription);
// router.get("/:id", auth, AutController.getById);
// router.patch(
//   "/avatars",
//   auth,
//   upload.single("avatar"),
//   AutController.uploadAvatar
// );

// module.exports = router;
// const storage = multer.diskStorage({
//     destination: function (__, ___, cb) {
//       cb(null, path.join(__dirname, "../../", "tmp"));
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = crypto.randomUUID();
//       const ext = path.extname(file.originalname);
//       const baseName = path.basename(file.originalname, ext);
  
//       const sourcePath = file.path;
//       const destinationPath = path.join(
//         avatarDir,
//         `${baseName}-${uniqueSuffix}${ext}`
//       );
  
//       fs.copyFile(sourcePath, destinationPath, function (err) {
//         if (err) {
//           console.error("Помилка при копіюванні файлу:", err);
//           cb(err);
//         } else {
//           fs.unlink(sourcePath, function (err) {
//             if (err) {
//               console.error("Помилка при видаленні початкового файлу:", err);
//               cb(err);
//             } else {
//               console.log("Файл успішно перенесено та перейменовано");
//               cb(null, `${baseName}-${uniqueSuffix}${ext}`);
//             }
//           });
//         }
//       });
//     },
//   });
// const sourcePath = path.join(tmpPath, nameFile);
// const destinationPath = path.join(
//   avatarDir,
//   nameFile);