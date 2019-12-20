const { Router } = require('express');
const User = require('../models/User');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/signup', (req, res) => {
    const {
      username,
      password
    } = req.body;

    User
      .create({
        username,
        password
      })
      .then(user => {
        const token = user.authToken();

        res.cookie('seesion', token);
        res.send(user.toJSON());
      });
  })

  .post('/signin', (req, res) => {
    const {
      username,
      password
    } = req.body;

    User.findOne({ username })
      .then(user => {
        const isValidPassword = user.compare(password);
        if(isValidPassword) {
          const token = user.authToken();
          res.cookie('session', token);
          res.send(user);
        } else {
          const err = new Error('Invalid username/password');
          err.status = 401;
        }
      });
  })

  .get('/verify', ensureAuth, (req, res) => {
    res.send(req.user);
  });
