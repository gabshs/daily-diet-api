import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { FindMealUseCase } from '@/use-cases/meals/find'
import { FastifyReply, FastifyRequest } from 'fastify'
import { inject, singleton } from 'tsyringe'
import { z } from 'zod'

const findMealParamsSchema = z.object({
  mealId: z.string(),
})

@singleton()
export class FindMealController {
  constructor(
    @inject(FindMealUseCase)
    private readonly findMealUseCase: FindMealUseCase,
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { sub } = request.user
    const { mealId } = findMealParamsSchema.parse(request.params)

    try {
      const { meal } = await this.findMealUseCase.execute({
        userId: sub,
        mealId,
      })

      return reply.status(200).send({ meal })
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return reply.status(404).send({ message: error.message })
      }
    }
  }
}
