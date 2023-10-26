import { MealsRepository } from '@/repositories/meals-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface FindMealUseCaseParams {
  mealId: string
  userId: string
}

export class FindMealUseCase {
  constructor(private readonly mealsRepository: MealsRepository) {}

  async execute({ mealId, userId }: FindMealUseCaseParams) {
    const meal = await this.mealsRepository.findOneByUser(mealId, userId)

    if (!meal) {
      throw new ResourceNotFoundError('Meal')
    }

    return { meal }
  }
}
