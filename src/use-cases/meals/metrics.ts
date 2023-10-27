import { MealsRepository } from '@/repositories/meals-repository'
import { inject, injectable } from 'tsyringe'

@injectable()
export class MealsMetricsUseCase {
  constructor(
    @inject('MealsRepository')
    private readonly mealsRepository: MealsRepository,
  ) {}

  async execute(userId: string) {
    const metrics = await this.mealsRepository.getMetricsByUser(userId)

    return { metrics }
  }
}
