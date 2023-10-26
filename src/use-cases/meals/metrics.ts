import { MealsRepository } from '@/repositories/meals-repository'

export class MealsMetricsUseCase {
  constructor(private readonly mealsRepository: MealsRepository) {}

  async execute(userId: string) {
    const metrics = await this.mealsRepository.getMetricsByUser(userId)

    return { metrics }
  }
}
