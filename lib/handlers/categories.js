const { validationResult } = require('express-validator')
const categoryModel = require('../models/categories')
const userModel = require('../models/users')

async function create(req, res) {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });
  }

  try {
    // const user = await userModel.findByEmail(req.email)
    // req.body.userId = user[0].id
    const category = await categoryModel.save( req.body )
    console.log('category', category)
    res.send('Category created successfully')
  } catch(e) {
    console.error(e.message);
    res.status(500).send('Server error')
  }
}

async function update(req, res) {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });
  }
  try {
    // const user = await userModel.findByEmail(req.email)
    // req.body.userId = user[0].id
    const profile = await profileModel.save( req.body )
    console.log('profile', profile)
    res.send('Profile updated successfully')
  } catch(e) {
    console.error(e.message);
    res.status(500).send('Server error')
  }
}

async function fetchAll (req, res) {
  try {
    const user = await userModel.findByEmail(req.email)
    const profile = await profileModel.findByUserId( user[0].id )
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

async function fetch (req, res) {
  const { id } = req.params
  try {
    const profile = await profileModel.findById( id )
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

module.exports = {
  create,
  update,
  fetchAll,
  fetch
}