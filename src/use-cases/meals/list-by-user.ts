import { MealsRepository } from '@/repositories/meals-repository'

interface ListMealsByUserUseCaseParams {
  userId: string
  page: number
}

export class ListMealsByUserUseCase {
  constructor(private readonly mealsRepository: MealsRepository) {}

  async execute({ userId, page }: ListMealsByUserUseCaseParams) {
    const meals = await this.mealsRepository.findManyByUser(userId, page)
    return { meals }
  }
}
