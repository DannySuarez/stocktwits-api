const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(require('cookie-parser')());

app.use(cors({
  origin: true
}));

app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/tweets', require('./routes/tweets'));
app.use('/api/v1/watchlist', require('./routes/watchList'));

module.exports = app;
