const { check } = require('express-validator')

const postValidation = [
  check(
    'name',
    'Name is required'
  ).not().isEmpty(),
  check(
    'email', 
    'Please include a valid email'
  ).isEmail(),
  check(
    'password', 
    'Please enter password with 6 or more characters'
  ).isLength({ min: 6}),
  // check(
  //   'mobile',
  //   ''
  // ).
]

module.exports = {
  postValidation
}