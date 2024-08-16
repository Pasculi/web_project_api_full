const express = require("express");
const fs = require("fs");
const path = require("path");
const { getCards, createCard } = require("../controllers/cards");
const router = express.Router();
const cardController = require('../controllers/cards')

const cardFilePath = path.join(__dirname, "../data/cards.json");



router.get('/',cardController.getCards)
router.post('/',cardController.createCard)
router.delete('/:cardId', cardController.deleteCard)
router.put('/:cardId/likes', cardController.likeCard);
router.delete('/:cardId/likes', cardController.dislikeCard);


module.exports = router;