import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ListMealsByUserUseCase } from './list-by-user'

let mealsRepository: InMemoryMealsRepository
let sut: ListMealsByUserUseCase

describe('ListMealsByUserUseCase', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new ListMealsByUserUseCase(mealsRepository)
  })
  it('should be able to list meals by customer paginated', async () => {
    for (let i = 1; i <= 22; i++) {
      await mealsRepository.create({
        name: 'Strogonof de frango',
        description: 'Arroz branco, strogonof de frango, batata frita',
        eaten_at: new Date('2023-10-25T20:55:00.000Z'),
        is_on_diet: false,
        user_id: 'user_id_1',
      })
    }
    await mealsRepository.create({
      name: 'Strogonof de frango',
      description: 'Arroz branco, strogonof de frango, batata frita',
      eaten_at: new Date('2023-10-24T12:55:00.000Z'),
      is_on_diet: false,
      user_id: 'user_id_2',
    })

    const { meals } = await sut.execute({ userId: 'user_id_1', page: 2 })

    expect(meals).toHaveLength(2)
    expect(meals).toEqual([
      expect.objectContaining({ user_id: 'user_id_1' }),
      expect.objectContaining({ user_id: 'user_id_1' }),
    ])
  })
})
