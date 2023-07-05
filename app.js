const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
require('dotenv').config();

const usersAuth = require('./routes/api/auth');
const tasksRouter = require('./routes/api/tasks');
const reviewsRouter = require('./routes/api/reviews');
const statisticsRouter = require('./routes/api/statistics');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/auth', usersAuth);
app.use('/api/tasks', tasksRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/statistics', statisticsRouter);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
