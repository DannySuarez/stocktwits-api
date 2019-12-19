require('dotenv').config();

const request = require('supertest');
const app = require('../../lib/app');
const connect = require('../utils/connect');
const mongoose = require('mongoose');

describe('auth routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({ username: 'Danny', password: 'password' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'Danny',
          __v: 0
        });
      });
  });
})
;
