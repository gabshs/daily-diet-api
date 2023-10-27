import fastify from 'fastify'
import 'reflect-metadata'
import { UsersRoutes } from './http/controllers/users/routes'
import { ZodError } from 'zod'
import fastifyJwt from '@fastify/jwt'
import { container } from './di/container'

export const app = fastify()

app.register(fastifyJwt, {
  secret: 'dailyDietJWTToken',
  sign: { expiresIn: '1d' },
})

const usersRoutes = container.resolve(UsersRoutes)

app.register((instance) => usersRoutes.mountRoutes(instance), {
  prefix: '/users',
})

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  console.error(error.message)
  return reply.status(500).send({ message: 'Internal server error' })
})
