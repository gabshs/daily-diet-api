import { MealsRepository } from '@/repositories/meals-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { inject, injectable } from 'tsyringe'

interface DeleteMealUseCaseParams {
  mealId: string
  userId: string
}

@injectable()
export class DeleteMealUseCase {
  constructor(
    @inject('MealsRepository')
    private readonly mealsRepository: MealsRepository,
  ) {}

  async execute({ mealId, userId }: DeleteMealUseCaseParams) {
    const meal = await this.mealsRepository.findOneByUser(mealId, userId)

    if (!meal) {
      throw new ResourceNotFoundError('Meal')
    }

    await this.mealsRepository.delete(meal)

    return { meal }
  }
}
