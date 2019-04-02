require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if(token) {
    jwt.verify(token, process.env.secret, ((err, decodedToken) => {
      if(err) {
        //record event
        res.status(401).json({ message: 'shall not pass' })
      } else {
        req.payload = decodedToken;
        console.log(req.payload)
        next();
      }
    }));
  } else {
    res.status(401).json({ message: 'Invalid Credentials' });
  }
}
