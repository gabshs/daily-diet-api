import { MealsRepository } from '@/repositories/meals-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { inject, injectable } from 'tsyringe'

interface FindMealUseCaseParams {
  mealId: string
  userId: string
}

@injectable()
export class FindMealUseCase {
  constructor(
    @inject('MealsRepository')
    private readonly mealsRepository: MealsRepository,
  ) {}

  async execute({ mealId, userId }: FindMealUseCaseParams) {
    const meal = await this.mealsRepository.findOneByUser(mealId, userId)

    if (!meal) {
      throw new ResourceNotFoundError('Meal')
    }

    return { meal }
  }
}
