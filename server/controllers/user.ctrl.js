const User = require("../models/User");
const geoip = require("geoip-lite");

module.exports = {
  getAll: (req, res, next) => {
    User.find({}, ((err, users) => {
      if (err)
        res.send(err);
      else if (!users)
        res.send(404);
      else
        users.forEach((user) => {
          const { country } = geoip.lookup(user.ip);
          user.ip = country;

          return user;
        });

        res.json(users);
      next();
    }));
  }
};
