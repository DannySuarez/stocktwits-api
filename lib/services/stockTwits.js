const superagent = require('superagent');

const getStockTweets = async(symbol) => {
  const response = await superagent
    .get(`https://api.stocktwits.com/api/2/streams/symbol/${symbol}.json`);
  if(response.status !== 200) throw new Error('Something went wrong with the API call');
  return response.body.messages;
};

module.exports = getStockTweets;
