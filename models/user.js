const mongoose = require('mongoose');
const { emailRegex } = require('../utils/constants');

const user = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => {
        const isValid = emailRegex.test(v);
        if (!isValid) {
          throw new Error('Некорректный email');
        }
        return true;
      },
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = mongoose.model('user', user);
