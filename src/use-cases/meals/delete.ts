import { MealsRepository } from '@/repositories/meals-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface DeleteMealUseCaseParams {
  mealId: string
  userId: string
}

export class DeleteMealUseCase {
  constructor(private readonly mealsRepository: MealsRepository) {}

  async execute({ mealId, userId }: DeleteMealUseCaseParams) {
    const meal = await this.mealsRepository.findOneByUser(mealId, userId)

    if (!meal) {
      throw new ResourceNotFoundError('Meal')
    }

    await this.mealsRepository.delete(meal)

    return { meal }
  }
}
