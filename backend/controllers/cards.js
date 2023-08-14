const Card = require('../models/card');
const MissingError = require('../util/errors/MissingError');
const ForbiddenError = require('../util/errors/ForbiddenError');

function handleAndSendCard(card, res) {
  if (card === null) {
    return Promise.reject(
      new MissingError('Запрашиваемая карточка не найдена'),
    );
  }
  return res.send({ data: card });
}

module.exports.getCards = (req, res, next) => {
  Card.find()
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card === null) {
        return Promise.reject(
          new MissingError('Запрашиваемая карточка не найдена'),
        );
      }

      if (card.owner.toString() === req.user._id) {
        return Card.findByIdAndRemove(req.params.cardId)
      }
      else {
        return Promise.reject(new ForbiddenError('Невозможно удалить чужую карточку'));
      }
    })
    .then((card) => handleAndSendCard(card, res))
    .catch((err) => {
      next(err);
    });
};

module.exports.createCard = (req, res, next) => {
  const { link, name } = req.body;

  const owner = req.user._id;


  Card.create({ link, name, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  // console.log(req);
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => handleAndSendCard(card, res))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => handleAndSendCard(card, res))
    .catch(next);
};
