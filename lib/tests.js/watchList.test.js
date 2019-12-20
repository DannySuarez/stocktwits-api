require('dotenv').config();

const request = require('supertest');
const app = require('../../lib/app');
const connect = require('../utils/connect');
const mongoose = require('mongoose');
const User = require('../models/User');
const WatchList = require('../models/WatchList');

describe('auth routes', () => {
  beforeAll(() => {
    connect();
  });

  let dan = null;
  let twtr = null;
  beforeEach(async() => {
    dan = await User.create({ username: 'dan', password: 'password' });
    twtr = await WatchList.create({ user: dan._id, symbols: 'twtr' });
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
  
  it('can add items to a watch lists', () => {
    return request(app)
      .patch('/api/v1/watchlist')
      .send({ 
        dan,
        symbols: 'aapl'
      })
      .then(res => {
        console.log(res.body);
      });
  });
});
