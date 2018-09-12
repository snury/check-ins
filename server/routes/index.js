// server/routes/index.js
const user = require("./user");

module.exports = (router) => {
  user(router);
};
