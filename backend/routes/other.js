const router = require('express').Router(); // создали роутер
const MissingError = require('../util/errors/MissingError');

router.all('/', (req, res, next) => next(new MissingError('Нет такого пути')));

module.exports = router;
