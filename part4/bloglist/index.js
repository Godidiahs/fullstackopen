const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

// Full Stack Open Part 4, exercise 4.1: the application is
// started here; all Express setup lives in app.js so it can
// be imported by the tests in tests/blog_api.test.js.

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
