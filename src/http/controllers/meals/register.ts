import { RegisterMealUseCase } from '@/use-cases/meals/register'
import { FastifyReply, FastifyRequest } from 'fastify'
import { inject, singleton } from 'tsyringe'
import { z } from 'zod'

const registerMealBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  eatenAt: z.date(),
  isOnDiet: z.boolean(),
})

@singleton()
export class RegisterMealController {
  constructor(
    @inject(RegisterMealUseCase)
    private readonly registerMealUseCase: RegisterMealUseCase,
  ) {}

  async handle(req: FastifyRequest, reply: FastifyReply) {
    const { sub } = req.user
    const { name, description, eatenAt, isOnDiet } =
      registerMealBodySchema.parse(req.body)

    const { meal } = await this.registerMealUseCase.execute({
      name,
      description,
      eatenAt,
      isOnDiet,
      userId: sub,
    })

    return reply.status(201).send({ meal })
  }
}
