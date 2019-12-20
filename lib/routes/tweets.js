const { Router } = require('express');
const getStockTweets = require('../services/stockTwits');

module.exports = Router() 
  .get('/:id', async(req, res) => {
    const symbol = req.params.id;
    const message = await getStockTweets(symbol);

    res.send(message);    
  });
