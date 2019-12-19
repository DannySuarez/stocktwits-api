const { Router } = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

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
  });
