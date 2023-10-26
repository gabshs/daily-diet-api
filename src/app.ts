import fastify from 'fastify'
import 'reflect-metadata'
import { container } from 'tsyringe'
import { UsersRoutes } from './http/controllers/users/routes'
import { ZodError } from 'zod'

export const app = fastify()

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
