const config = require('./utils/config.js')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter= require('./controllers/users')
const middleware= require('./utils/middleware.js')
const loginRouter= require('./controllers/login.js')
//const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

const mongoose = require('mongoose')
const testingRouter = require('./controllers/testing.js')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.URL)
mongoose.connect(config.URL)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })


  
app.use(cors())
//app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/testing',testingRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

