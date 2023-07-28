const login= require("./login");
const logout= require("./logout");
const registered= require("./registered");
const current= require("./current");
const subscription= require("./subscription");
const verifyToken = require("./verify");
const sendVerifyLeter = require("./sendVerifyLeter");

module.exports = {
    login,
    logout,
    registered,
    current,
    subscription,
    verifyToken,
    sendVerifyLeter
}