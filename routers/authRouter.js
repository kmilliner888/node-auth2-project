const router = require('express').Router();
const Users = require('../data/users-model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');
const { isValid } = require('../data/users-service.js');

router.post('/register', (req, res) => {
    let credentials = req.body;

    if (isValid(credentials)) {
        const rounds = process.env.BCRYPT_ROUNDS || 8;

        const hash = bcrypt.hashSync(credentials.password, rounds);
        credentials.password = hash;

        Users.add(credentials)
            .then(user => {
                const token = genToken(saved);
                res.status(201).json({data: user, token});
            })
            .catch(error => {
                res.status(500).json({message: error.message});
            });
    } else {
        res.status(400).json({
            message: "You must provide a username, passowrd, and department"
        });
    }
});

router.post('/login', (req, res) => {
    const {username, password} = req.body;

    if (isValid(req.body)) {
        Users.findBy({ username: username })
          .then(([user]) => {
            if (user && bcrypt.compareSync(password, user.password)) {
              const token = generateToken(user);
              res.status(200).json({
                message: "Welcome!",
                token
              });
            } else {
              res.status(401).json({ message: "Invalid credentials" });
            }
          })
          .catch(error => {
            res.status(500).json({ message: error.message });
          });
      } else {
        res.status(400).json({
          message: "please provide username, password, and department",
        });
      }
});

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy( error => {
            if (error) {
                res.send('sorry');
            } else {
                res.send('see ya');
            }
        })
    } else {
        res.end();
    }
});

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department
    };

    const options = {
        expiresIn: "2h"
    };

    return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;