const express = require('express');
const bcrypt = require('bcryptjs');
const Users = require('./users-model.js');
const restricted = require('../middleware/restricted.js');
const router = express.Router();

router.get('/', restricted, (req, res) => {
    Users.find()
        .then(users => {
            res.json(users)
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to get users'})
        })
})

router.post('/register', (req, res) => {
    let { username, password } = req.body

    const hash = bcrypt.hashSync(password, 8)

    Users.add({ username, password: hash })
    .then(savedUser => {
        res.status(201).json(savedUser)
    }) 
    .catch(error => {
        res.status(500).json({ message: 'Server Error.'})
    })
})

router.post('/login', (req, res) => {
    let { username, password } = req.body

    Users.findBy({ username })
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)) {
            res.status(200).json({ message: `Welcome ${user.username}`})
        }
        else {
            res.status(401).json({ message: 'Invalid Credentials'})
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'Server Error'})
    })
})

module.exports = router;
