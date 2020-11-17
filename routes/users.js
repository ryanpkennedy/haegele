const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const maxPlayers = config.get('maxPlayers');
const { check, validationResult } = require('express-validator');

const User = require('../models/User.js');

router.post(
    '/',
    check('name', 'Name is required').not().isEmpty(),
    check('room', 'Room is required').not().isEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, room } = req.body;

        try {
            //see if user exists
            let user = await User.findOne({ name });

            if (user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'User already exists' }] });
            }

            users = await User.find({});
            pNum = users.length;

            if (pNum === maxPlayers) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Room is full' }] });
            }

            user = new User({
                name,
                room,
            });

            await user.save();

            //return jwt
            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 7200 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

router.get('/', async (req, res) => {
    try {
        const users = await User.find().populate('user', ['name']);
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
