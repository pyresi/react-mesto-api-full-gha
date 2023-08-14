require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { login } = require('./controllers/login');
const { createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { handleErrors } = require('./util/handleErrors');
const { celebrate, Joi, errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');

// Слушаем 3000 порт
const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();
app.use(helmet());

mongoose
  .connect(DB_URL, {
    useUnifiedTopology: true,
  });

app.use(express.json()); // для собирания JSON-формата
app.use(express.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^(http:\/\/|https:\/\/)(www)?[0-9a-zA-Z-._~:/?#[\]@!$&'()*+,;=]+#?$/),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  })
}), createUser);

app.use(auth);

const userRouter = require('./routes/users');
// импортируем роутер
app.use('/users', userRouter); // запускаем

const cardRouter = require('./routes/cards');
// импортируем роутер
app.use('/cards', cardRouter); // запускаем

const otherRouter = require('./routes/other');

app.use('/*', otherRouter);

app.use(errorLogger);

app.use(errors());


app.use((err, req, res, next) => {
  return handleErrors(res, err);
});