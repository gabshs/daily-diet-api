import { ListMealsByUserUseCase } from '@/use-cases/meals/list-by-user'
import { FastifyReply, FastifyRequest } from 'fastify'
import { inject, singleton } from 'tsyringe'
import { z } from 'zod'

const listMealsQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
})

@singleton()
export class ListMealsController {
  constructor(
    @inject(ListMealsByUserUseCase)
    private readonly listMealsUseCase: ListMealsByUserUseCase,
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { sub } = request.user
    const { page } = listMealsQuerySchema.parse(request.query)

    const { meals } = await this.listMealsUseCase.execute({ userId: sub, page })

    return reply.status(200).send({ meals })
  }
}
