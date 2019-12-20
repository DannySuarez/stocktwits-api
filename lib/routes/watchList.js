const { Router } = require('express');
const WatchList = require('../models/WatchList');

module.exports = Router()
  .patch('/', (req, res) => {
    const {
      user,
      symbols
    } = req.body;
    
    WatchList
      .create({ user, symbols }, { new: true })
      .then(symbol => res.send(symbol));
  });
