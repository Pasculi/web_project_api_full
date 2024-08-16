const User = require("../models/user");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}).orFail(()=>{
      const error = new Error("Users not found")
      error.statusCode= 404;
      throw error;
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const newUser = new User({ name, about, avatar });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
      console.log(req.user._id)
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