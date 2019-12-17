const superagent = require('superagent');

const getStockTweets = (symbl) => {
  return superagent
    .get(`https://api.stocktwits.com/api/2/streams/symbol/${symbl}.json`)
    .then(res => {
      if(!res.status === 200) throw new Error('Something went wrong');
      const messages = res.body.messages;
      return messages;
    });
};

module.exports = getStockTweets;
