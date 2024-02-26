// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true
})

// Require external modules
const mongoose = require('mongoose')

// Connect to DB Universidad
mongoose.connect('mongodb://localhost/Universidad')
  .then(() => console.log('MongoDB connected…'))
  .catch(err => console.log(err))

// Routes declaration
const routes = require('./routes')

routes.forEach((route, index) => {
  fastify.route(route)
})

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

// Run the server
const start = async () => {
  try {
    await fastify.listen(3000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()