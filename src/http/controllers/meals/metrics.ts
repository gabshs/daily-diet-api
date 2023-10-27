import { MealsMetricsUseCase } from '@/use-cases/meals/metrics'
import { FastifyReply, FastifyRequest } from 'fastify'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetMealsMetricsController {
  constructor(
    @inject(MealsMetricsUseCase)
    private readonly mealsMetricsUseCase: MealsMetricsUseCase,
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { sub } = request.user

    const { metrics } = await this.mealsMetricsUseCase.execute(sub)

    return reply.status(200).send({ metrics })
  }
}
