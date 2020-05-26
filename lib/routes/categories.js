const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const categoryHandler = require('../handlers/categories')
const categoryValidator = require('../validators/categories')

// @route   GET api/categories
// @desc    Fetch all the categories of particular level
// @access  Public
router.get('/', categoryHandler.fetch)

// @route   GET api/categories/:parentId
// @desc    Fetch categories using parents
// @access  Public
router.get('/:parentId', categoryHandler.fetchChildren)

// @route   POST api/categories
// @desc    Create categories
// @access  Public
router.post('/', categoryValidator.postValidation, auth,  categoryHandler.create)

// @route   PUT api/categories
// @desc    Update categories
// @access  Public
router.put('/', categoryValidator.postValidation, auth,  categoryHandler.update)

// @route   PATCH api/categories/:id
// @desc    Update categories
// @access  Public
router.patch('/', categoryValidator.verification, auth,  categoryHandler.verification)

module.exports = router
