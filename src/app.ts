import fastify from 'fastify'
import 'reflect-metadata'
import { UsersRoutes } from './http/controllers/users/routes'
import { ZodError } from 'zod'
import fastifyJwt from '@fastify/jwt'
import { container } from './di/container'
import { MealsRoutes } from './http/controllers/meals/routes'
import { env } from './env'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: { expiresIn: '1d' },
})

const usersRoutes = container.resolve(UsersRoutes)
const mealsRoutes = container.resolve(MealsRoutes)

app.register((instance) => usersRoutes.mountRoutes(instance))

app.register((instance) => mealsRoutes.mountRoutes(instance), {
  prefix: '/meals',
})

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error.message)
  } else {
    // TODO: Here we should log to an external tool
  }

  return reply.status(500).send({ message: 'Internal server error' })
})
