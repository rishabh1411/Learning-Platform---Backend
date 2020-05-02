const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const authHandler = require('../handlers/auth')
const authValidator = require('../validators/auth')

// @route   GET api/auth
// @desc    Fetch authenticate user
// @access  Public

router.get('/', auth, authHandler.fetchUser)

// @route   POST users
// @desc    Authenticate user & get token
// @access  Public
router.post('/', authValidator.authenticateValidation, authHandler.authenticateUser)

module.exports = router
