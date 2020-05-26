const { validationResult } = require('express-validator')
const userModel = require('../models/users')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

async function create(req, res) {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });
  }

  var { name, email, password, mobile } = req.body

  try {
    console.log('jwtconfig',  config.get('jwtSecret'))

    const user = await userModel.exists(email, mobile)
    console.log('user', user)

    if(user==null){
      res.status(400).json({ errors: [{ msg: 'User already exists' }] })
      return;
    }

    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    })
    console.log('avatar', avatar)
    const salt = await bcrypt.genSalt(10)
    password = await bcrypt.hash(password, salt)
    req.body.password = password
    await userModel.create(req.body)
    res.send(req.body)
  } catch(e) {
    console.error(e.message);
    res.status(500).send('Server error')
  }
}

module.exports = {
  create
}