const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, (req, res) => {
  Users.find()
    .then(users => {
      //View decoded token -- not for production
      res.json({users, token: req.payload});
    })
    .catch(err => res.send(err));
});

module.exports = router;
