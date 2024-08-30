
const Card = require("../models/card");

exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({}).orFail(() => {
      const error = new Error("Cards not found");
      error.statusCode = 404;
      throw error;
    });
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;
    const newCard = new Card({ name, link, owner });
    await newCard.save();
    res.status(200).json(newCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findOneAndDelete(req.params.cardId);
    if (!card) {
      return res.status(400).json({ message: "Card not found" });
    }
    res.status(200).json({ message: "Card deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.upadateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const updateData = req.body;
    const updateUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    if (!updateUser) {
      return res.status(400).json({ message: "Profile not found" });
    }
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUserAvatar = async (req, res) => {
  try {
    const userId = req.user._id;
    const { avatar } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "Avatar not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    );
    console.log(card);
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }
    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.dislikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true }
    );
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }
    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
