import { ResourceAlreadyExistsError } from '@/use-cases/errors/resource-already-exists-error'
import { RegisterUseCase } from '@/use-cases/user/register'
import { FastifyReply, FastifyRequest } from 'fastify'
import { inject, injectable } from 'tsyringe'
import { z } from 'zod'

const registerUserBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

@injectable()
export class RegisterUserController {
  constructor(
    @inject(RegisterUseCase)
    private readonly registerUserUseCase: RegisterUseCase,
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password } = registerUserBodySchema.parse(request.body)

    try {
      const registeredUser = await this.registerUserUseCase.execute({
        name,
        email,
        password,
      })
      return reply.status(201).send({ data: registeredUser })
    } catch (error) {
      if (error instanceof ResourceAlreadyExistsError) {
        return reply.status(409).send({ message: error.message })
      }

      throw error
    }
  }
}
