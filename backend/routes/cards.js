const express = require("express");
const router = express.Router();
const cardController = require('../controllers/cards')


router.get('/',cardController.getCards)
router.post('/',cardController.createCard)
router.delete('/:cardId', cardController.deleteCard)
router.put("/likes/:cardId", cardController.likeCard);
router.delete("/likes/:cardId", cardController.dislikeCard);


module.exports = router;