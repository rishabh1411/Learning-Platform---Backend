const { check } = require('express-validator')

const postValidation = [
  check(
    'name', 
    'Exceded the word limit'
  ).trim().isLength({ max: 100}).exists(),
  check(
    'typeLevel', 
    'Cannot be empty'
  ).trim().exists(),
]

module.exports = {
  postValidation
}