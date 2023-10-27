import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { AuthenticateUseCase } from '@/use-cases/user/authenticate'
import { FastifyReply, FastifyRequest } from 'fastify'
import { inject, singleton } from 'tsyringe'
import { z } from 'zod'

const authenticateUserBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

@singleton()
export class AuthenticateController {
  constructor(
    @inject(AuthenticateUseCase)
    private readonly authenticateUseCase: AuthenticateUseCase,
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = authenticateUserBodySchema.parse(request.body)

    try {
      const { user } = await this.authenticateUseCase.execute({
        email,
        password,
      })

      const token = await reply.jwtSign({}, { sign: { sub: user.id } })

      return reply.status(200).send({ token })
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return reply.status(400).send({ message: error.message })
      }

      throw error
    }
  }
}
