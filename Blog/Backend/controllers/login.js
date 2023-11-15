const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, pass } = request.body
  console.log('request body', request.body)
  const user = await User.findOne({ username })
  console.log('user ', user)
  console.log(pass,user.passwordHash)
  const passwordCorrect = user === null
    ? false
    : bcrypt.compare(pass, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }
  console.log('dhaskj',process.env.SECRET)
  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter