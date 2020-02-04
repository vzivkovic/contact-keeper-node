const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/Users');

// @route POST api/users
// @desc Request a user
// @access Public
router.post('/', [
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', 'Pleas include a valid email')
        .isEmail(),
    check('password', 'Please enter a password with 6 or more characters')
        .isLength({ min: 6 })
], async (req, res) => {

    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // get data
    const { name, email, password } = req.body;

    try {
        // check if user exist
        let user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({ msg: 'User alredy exist' });
        }

        user = new User({
            name,
            email,
            password
        });

        // cript password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // save user
        await user.save();

        // create token
        const paylaod = {
            user: {
                id: user.id
            }
        };

        jwt.sign(paylaod, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {

            if (err) throw err;
            res.json({ token })

        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
