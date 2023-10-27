import { prisma } from '@/lib/prisma'
import { hash } from 'bcrypt'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123123q', 6),
    },
  })

  const {
    body: { token },
  } = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: '123123q',
  })

  return { token }
}
