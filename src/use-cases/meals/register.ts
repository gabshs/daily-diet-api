import { MealsRepository } from '@/repositories/meals-repository'

interface RegisterMealUseCaseParams {
  name: string
  description: string
  eatenAt: Date
  isOnDiet: boolean
  userId: string
}

export class RegisterMealUseCase {
  constructor(private readonly mealsRepository: MealsRepository) {}

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
