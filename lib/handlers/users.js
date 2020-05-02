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

    // if(user){
    //   res.status(400).json({ errors: [{ msg: 'User already exists' }] })
    // }

    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    })
    console.log('avatar', avatar)
    const salt = await bcrypt.genSalt(10)
    password = await bcrypt.hash(password, salt)
    const createdUser = await userModel.create(name, email, mobile, password)
    console.log(createdUser)

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
  create
}