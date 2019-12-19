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

  it('can sign in a user', async() => {
    const jon = await User.create({
      username: 'Jon',
      password: 'password'
    });

    return request(app)
      .post('/api/v1/auth/signin')
      .send({ 
        username: 'Jon',
        password: 'password'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: jon.username,
          __v: 0
        });
      });
  });
})
;
