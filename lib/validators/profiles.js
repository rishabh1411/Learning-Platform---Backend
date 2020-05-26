const { check } = require('express-validator')

// const postValidation = [
//   check(
//     'name',
//     'Name is required'
//   ).not().isEmpty(),
//   check(
//     'email', 
//     'Please include a valid email'
//   ).isEmail(),
//   check(
//     'password', 
//     'Please enter password with 6 or more characters'
//   ).isLength({ min: 6}),
// ]

const postValidation = [
  check(
    'bio_title', 
    'Exceded the word limit'
  ).trim().isLength({ max: 100}),
  check(
    'bio_description', 
    'Exceded the word limit'
  ).trim().isLength({ max: 1000}),
  // check(
  //   'user_id', 
  //   'Need to link to user'
  // ).trim().exists(),
]

module.exports = {
  postValidation
}