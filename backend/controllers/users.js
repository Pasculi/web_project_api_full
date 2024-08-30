const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET } = process.env;

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}).orFail(() => {
      const error = new Error("Users not found");
      error.statusCode = 404;
      throw error;
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.createUser = async (req, res, next) => {
  const { name, about, avatar, email } = req.body;

  let user = await User.findOne({ email });
  if (user) {
    throw new Error(" El email ya se encuentra registrado"); // correccion del email y el password en createUser
  }
  /* const hash = await bcrypt.hash(req.body.password, 10); */

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.password, salt, async function (err, hash) {
      user =  await User.create({ name, about, avatar, email, password: hash });
      res.send({ user });
      // Store hash in your password DB.
    });
  });

};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.send({ token });
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, about } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true }
    ).orFail(() => {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar el avatar del usuario
exports.updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true }
    ).orFail(() => {
      const error = new Error("User not founds");
      error.statusCode = 404;
      throw error;
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
