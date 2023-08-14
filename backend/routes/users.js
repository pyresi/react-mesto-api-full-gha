const router = require('express').Router(); // создали роутер
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUserById,
  modifyUser,
  modifyUserAvatar,
  getUserInfo
} = require('../controllers/users');

router.get('/me', getUserInfo);
router.get('/', getUsers);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required()
  }),
}), modifyUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/^(http:\/\/|https:\/\/)(www)?[0-9a-zA-Z-._~:/?#[\]@!$&'()*+,;=]+#?$/)
  }),
}), modifyUserAvatar);

module.exports = router;
