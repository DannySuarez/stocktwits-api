const request = require('supertest');
const app = require('../../lib/app');

describe('auth routes', () => {
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
