const { validationResult } = require('express-validator')
const userModel = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

async function fetchUser(req, res) {
  try {
    const user = await userModel.findByEmail(req.email)
    res.json(user[0])
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
  // res.send('Auth route GET')
  console.log('I am get call')
}

async function authenticateUser(req, res) {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });
  }
  var { email = null, mobile = null, password } = req.body
  try {

    const user = (await userModel.findByEmail(email, mobile))[0]
    console.log('user1', user)

    if(!user){
      res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
      return
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
      res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
    }
    const payload = {
      user: {
        email: email
      }
    }
    
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if(err) throw err;
        res.json({ token })
      })

  } catch(e) {
    console.error(e.message);
    res.status(500).send('Server error')
  }
}

module.exports = {
  fetchUser,
  authenticateUser
}