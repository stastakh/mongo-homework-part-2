const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const api = require('./routes');
const app = express();

const mongoose = require('mongoose');
const dev_db_url = 'mongodb://localhost/Local2';
const mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', api);

app.use((err, req, res, next) => {
  if (err.name === 'CastError') {
    res.status(404).send(err.message);
  } else {
    res.status(err.status || 500).send(err.message);
  }
});

const port = 4040;

app.listen(port, () => {
  console.log('Server is up and running on port numner ' + port);
});
