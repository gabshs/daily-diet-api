import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FindMealUseCase } from './find'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let mealsRepository: InMemoryMealsRepository
let sut: FindMealUseCase

describe('FindMealUseCase', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new FindMealUseCase(mealsRepository)
  })
  it('should be able to find a meal by customer', async () => {
    for (let i = 1; i <= 22; i++) {
      await mealsRepository.create({
        id: `#${i}`,
        name: 'Strogonof de frango',
        description: 'Arroz branco, strogonof de frango, batata frita',
        eaten_at: new Date('2023-10-25T20:55:00.000Z'),
        is_on_diet: false,
        user_id: 'user_id_1',
      })
    }
    await mealsRepository.create({
      id: '#33',
      name: 'Strogonof de frango',
      description: 'Arroz branco, strogonof de frango, batata frita',
      eaten_at: new Date('2023-10-24T12:55:00.000Z'),
      is_on_diet: false,
      user_id: 'user_id_2',
    })

    const { meal } = await sut.execute({ userId: 'user_id_1', mealId: '#22' })

    expect(meal).toEqual(
      expect.objectContaining({ id: '#22', user_id: 'user_id_1' }),
    )
  })

  it('should not be able to find a meal with incorrect customer', async () => {
    for (let i = 1; i <= 22; i++) {
      await mealsRepository.create({
        id: `#${i}`,
        name: 'Strogonof de frango',
        description: 'Arroz branco, strogonof de frango, batata frita',
        eaten_at: new Date('2023-10-25T20:55:00.000Z'),
        is_on_diet: false,
        user_id: 'user_id_1',
      })
    }
    await mealsRepository.create({
      id: '#33',
      name: 'Strogonof de frango',
      description: 'Arroz branco, strogonof de frango, batata frita',
      eaten_at: new Date('2023-10-24T12:55:00.000Z'),
      is_on_diet: false,
      user_id: 'user_id_2',
    })

    const promise = sut.execute({ userId: 'user_id_2', mealId: '#22' })

    await expect(promise).rejects.toBeInstanceOf(ResourceNotFoundError)
    await expect(promise).rejects.toThrowError('Meal not found.')
  })
})
