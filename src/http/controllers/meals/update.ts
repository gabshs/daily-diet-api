import { UpdateMealUseCase } from '@/use-cases/meals/update'
import { FastifyReply, FastifyRequest } from 'fastify'
import { inject, singleton } from 'tsyringe'
import { z } from 'zod'

const updateMealBodySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  eatenAt: z.coerce.date().optional(),
  isOnDiet: z.coerce.boolean().optional(),
})

const updateMealParamsSchema = z.object({
  mealId: z.string(),
})

@singleton()
export class UpdateMealController {
  constructor(
    @inject(UpdateMealUseCase)
    private readonly updateMealUseCase: UpdateMealUseCase,
  ) {}

  async handle(req: FastifyRequest, reply: FastifyReply) {
    const { sub } = req.user
    const { mealId } = updateMealParamsSchema.parse(req.params)
    const { name, description, eatenAt, isOnDiet } = updateMealBodySchema.parse(
      req.body,
    )

    const { meal } = await this.updateMealUseCase.execute({
      mealId,
      name,
      description,
      eatenAt,
      isOnDiet,
      userId: sub,
    })

    return reply.status(200).send({ meal })
  }
}
