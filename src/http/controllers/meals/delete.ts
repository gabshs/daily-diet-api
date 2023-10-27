import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { DeleteMealUseCase } from '@/use-cases/meals/delete'
import { FastifyReply, FastifyRequest } from 'fastify'
import { inject, singleton } from 'tsyringe'
import { z } from 'zod'

const findMealParamsSchema = z.object({
  mealId: z.string(),
})

@singleton()
export class DeleteMealController {
  constructor(
    @inject(DeleteMealUseCase)
    private readonly deleteMealUseCase: DeleteMealUseCase,
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { sub } = request.user
    const { mealId } = findMealParamsSchema.parse(request.params)

    try {
      await this.deleteMealUseCase.execute({
        userId: sub,
        mealId,
      })

      return reply.status(204).send()
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return reply.status(404).send({ message: error.message })
      }
    }
  }
}
