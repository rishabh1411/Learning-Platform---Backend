const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const profileHandler = require('../handlers/profiles')
const profileValidator = require('../validators/profiles')

// @route   GET api/profile/all
// @desc    Fetch all the profile details
// @access  Public
router.get('/all', auth, profileHandler.fetchAll)

// @route   GET api/profile/:id
// @desc    Fetch particular profile detail
// @access  Public
router.get('/:id', auth, profileHandler.fetch)

// @route   POST users
// @desc    Create profile
// @access  Public
router.post('/', profileValidator.postValidation, auth,  profileHandler.create)

// @route   PUT users
// @desc    Update profile
// @access  Public
router.put('/', profileValidator.postValidation, auth,  profileHandler.update)

module.exports = router
