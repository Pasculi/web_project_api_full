const express = require("express");
const router = express.Router();
const userController = require('../controllers/users');
const { Joi, Segments, celebrate } = require("celebrate");

router.get('/', userController.getUsers);
router.get('/:userId', userController.getUserById);
router.post('/', userController.createUser);

router.patch(
  "/me",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().min(5).max(40),
      about: Joi.string().required().min(5).max(200),
    }),
  }),
  userController.updateProfile
);
router.patch(
  "/me/avatar",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      avatar: Joi.string().required().uri(),
    }),
  }),
  userController.updateAvatar
);


module.exports = router;