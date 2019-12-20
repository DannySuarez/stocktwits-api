require('dotenv').config();

const request = require('supertest');
const app = require('../../lib/app');
const connect = require('../utils/connect');
const mongoose = require('mongoose');
const User = require('../models/User');

describe('auth routes', () => {
  beforeAll(() => {
    connect();
  });

  let dan = null;
  beforeEach(async() => {
    dan = await User.create({ username: 'dan', password: 'password' });
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
        symbols: ['aapl', 'twtr']
      })
      .then(res => {
        expect(res.body).toContainEqual({
          symbols: ['aapl', 'twtr'],
          _id: expect.any(String),
          __v: 0
        });
      });
  });
});
