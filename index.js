// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true
})

// Require external modules
const mongoose = require('mongoose')
const uri = "mongodb+srv://josefbehere:advanceQF3@devops.0ob5zjr.mongodb.net/?retryWrites=true&w=majority&appName=DevOps";

const connectToDB = async () => {
  try {
    await mongoose.connect(uri, { autoIndex: true });
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error(error);
  }
};
connectToDB()

// Routes declaration
const routes = require('./routes')

routes.forEach((route, index) => {
  fastify.route(route)
})

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'Josef B' }
})

// Run the server
const start = async () => {
  try {
    await fastify.listen(8080, '0.0.0.0')
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
