const { check } = require('express-validator')

const authenticateValidation = [
  check(
    'email', 
    'Please include a valid email'
  ).isEmail(),
  check(
    'password', 
    'Password is required'
  ).exists(),
]

module.exports = {
  authenticateValidation
}