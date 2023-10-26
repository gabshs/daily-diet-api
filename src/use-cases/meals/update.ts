import { MealsRepository } from '@/repositories/meals-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface UpdateMealUseCaseParams {
  userId: string
  mealId: string
  name?: string
  description?: string
  eatenAt?: Date
  isOnDiet?: boolean
}

export class UpdateMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    mealId,
    userId,
    name,
    description,
    eatenAt,
    isOnDiet,
  }: UpdateMealUseCaseParams) {
    const meal = await this.mealsRepository.findOneByUser(mealId, userId)

    if (!meal) {
      throw new ResourceNotFoundError('Meal')
    }

    const updatedMeal = Object.assign(meal, {
      name: name || meal.name,
      description: description || meal.description,
      eaten_at: eatenAt || meal.eaten_at,
      is_on_diet: isOnDiet || meal.is_on_diet,
    })

    await this.mealsRepository.update(updatedMeal)

    return { meal: updatedMeal }
  }
}
