const usercontroller = require('./../controllers/user.ctrl');

module.exports = (router) => {
  router
    .route('/users')
    .get(usercontroller.getAll);
};
