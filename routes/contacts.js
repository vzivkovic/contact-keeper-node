const express = require('express');
const router = express.Router();

// @route GET api/contacts
// @desc All user contacts
// @access Private
router.get('/', (req, res) => {
    res.send('Contacts page')
});

// @route POST api/contacts
// @desc Add new user contacts
// @access Private
router.post('/', (req, res) => {
    res.send('Add Contacts page')
});


// @route PUT api/contacts/:id
// @desc Update user contacts
// @access Private
router.put('/:id', (req, res) => {
    res.send('Update Contacts page')
});

// @route DELETE api/contacts/:id 
// @desc Remove user contacts
// @access Private
router.delete('/:id', (req, res) => {
    res.send('Delete Contacts page')
});

module.exports = router;