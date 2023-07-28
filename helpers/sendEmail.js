const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_APIKEY);

const sendEmail = async (data)=> {
    const email = { ...data, from: 'tushchenko.dmytro@meta.ua'};
    await sgMail.send(email);
    return true;
}
module.exports = sendEmail;
// const message = {
//   to: "tuschenko.dmutro@gmail.com",
//   from: 'tushchenko.dmytro@meta.ua',
//   subject: "Test email",
//   html: "<h1>Node.js is awesome platform</h1>",
//   text: "Node.js is awesome platform",
// };
// sgMail
//   .send(message)
//   .then((response) => console.log(response))
//   .catch((error) => console.error(error.response.body));