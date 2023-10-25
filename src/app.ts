import fastify, { FastifyReply } from "fastify";

export const app = fastify()

app.get('/', (_, reply: FastifyReply) => {
  return reply.send('Hello World')
})