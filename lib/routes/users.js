const express = require('express')
const router = express.Router()
const userHandler = require('../handlers/users')
const userValidator = require('../validators/users')
// const app = express();

// @route   GET users
// @desc    Test route
// @access  Public

router.get('/', (req,res) => {
  res.send('User route GET')
  console.log('I am get call')
  // userModels.insert()
  console.log('I am get call1')

})

// @route   POST users
// @desc    Register User
// @access  Public
router.post('/', userValidator.postValidation, userHandler.create)


module.exports = router
