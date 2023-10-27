import { MealsRepository } from '@/repositories/meals-repository'
import { inject, injectable } from 'tsyringe'

interface RegisterMealUseCaseParams {
  name: string
  description: string
  eatenAt: Date
  isOnDiet: boolean
  userId: string
}

@injectable()
export class RegisterMealUseCase {
  constructor(
    @inject('MealsRepository')
    private readonly mealsRepository: MealsRepository,
  ) {}

  async execute({
    name,
    description,
    eatenAt,
    isOnDiet,
    userId,
  }: RegisterMealUseCaseParams) {
    const meal = await this.mealsRepository.create({
      name,
      description,
      eaten_at: eatenAt,
      is_on_diet: isOnDiet,
      user_id: userId,
    })

    return { meal }
  }
}
