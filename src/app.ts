import fastify from 'fastify'
import 'reflect-metadata'
import { container } from 'tsyringe'
import { UsersRoutes } from './http/controllers/users/routes'

export const app = fastify()

const usersRoutes = container.resolve(UsersRoutes)

app.register(usersRoutes.mountRoutes, { prefix: '/users' })
