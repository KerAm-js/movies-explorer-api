const User = require('../models/user');

const getUserInfo = (req, res) => {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => res.send(user))
    .catch((e) => res.status(500).send({ message: e.message }));
};

const updateUserInfo = (req, res) => {
  const { _id } = req.user;
  const { email, name } = req.body;
  User.findByIdAndUpdate(_id, { email, name }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => res.send(user))
    .catch((e) => res.status(500).send({ message: e.message }));
};

module.exports = {
  getUserInfo,
  updateUserInfo,
};
