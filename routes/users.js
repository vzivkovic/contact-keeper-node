const express = require('express');
const router = express.Router();

// @route POST api/users
// @desc Request a user
// @access Public
router.post('/', (req, res) => {
    res.send('Registar a user')
});

module.exports = router;