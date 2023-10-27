import { MealsRepository } from '@/repositories/meals-repository'
import { inject, injectable } from 'tsyringe'

interface ListMealsByUserUseCaseParams {
  userId: string
  page: number
}

@injectable()
export class ListMealsByUserUseCase {
  constructor(
    @inject('MealsRepository')
    private readonly mealsRepository: MealsRepository,
  ) {}

  async execute({ userId, page }: ListMealsByUserUseCaseParams) {
    const meals = await this.mealsRepository.findManyByUser(userId, page)
    return { meals }
  }
}
