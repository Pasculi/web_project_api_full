const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Jacques Cousteau",
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    default: "Explorador",
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    dafault:
      "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
    required: true,
    validate: {
      validator: (v) => {
        return /^((https?:)(\/\/\/?)([\w]*(?::[\w]*)?@)?([\d\w\.-]+)(?::(\d+))?)?([\/\\\w\.()-]*)?(?:([?][^#]*)?(#.*)?)*/.test(
          v
        );
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  email: {
    type: String,
    required: [true, "El correo electrónico es obligatorio"],
    lowercase: true,
    validate: {
      validator: (value) => {
        return /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(value);
      },
    },
    unique: true,
  },
});

module.exports = mongoose.model('user', userSchema);
