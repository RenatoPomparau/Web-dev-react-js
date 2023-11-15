require('dotenv').config({path:'var.env'})

const PORTLOCAL=process.env.PORT
const URL = process.env.MONGODB_URI

module.exports = {
  URL,
  PORTLOCAL
}