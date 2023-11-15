const app = require('./app') // the actual Express application
const config = require('./utils/config')

app.listen(config.PORTLOCAL, () => {
  console.log(`Server running on port ${config.PORTLOCAL}`)
})