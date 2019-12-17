const superagent = require('superagent');

const getStockTweets = async(symbl) => {
  const response = await superagent
    .get(`https://api.stocktwits.com/api/2/streams/symbol/${symbl}.json`);
  if(response.status !== 200) throw new Error('Something went wrong with the API call');
  return response.body.messages;
};

module.exports = getStockTweets;
