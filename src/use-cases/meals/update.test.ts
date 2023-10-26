import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { UpdateMealUseCase } from './update'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let mealsRepository: InMemoryMealsRepository
let sut: UpdateMealUseCase

describe('UpdateMealUseCase', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new UpdateMealUseCase(mealsRepository)
  })
  it('should be able to update a meal', async () => {
    await mealsRepository.create({
      name: 'Strogonof de frango',
      description: 'Arroz branco, strogonof de frango, batata frita',
      eaten_at: '2023-10-25T20:55:00.000Z',
      is_on_diet: false,
      user_id: 'user_id_1',
      id: '#1',
    })

    const { meal } = await sut.execute({
      mealId: '#1',
      userId: 'user_id_1',
      name: 'Strogonof de carne',
      description: 'Arroz branco, strogonof de carne, batata frita',
      isOnDiet: true,
      eatenAt: new Date('2023-10-25T21:30:00.000Z'),
    })

    expect(meal).toEqual({
      name: 'Strogonof de carne',
      description: 'Arroz branco, strogonof de carne, batata frita',
      eaten_at: new Date('2023-10-25T21:30:00.000Z'),
      is_on_diet: true,
      user_id: 'user_id_1',
      id: '#1',
      created_at: expect.any(Date),
    })
  })

  it('should not be able to update a meal when userId is incorrect', async () => {
    await mealsRepository.create({
      name: 'Strogonof de frango',
      description: 'Arroz branco, strogonof de frango, batata frita',
      eaten_at: '2023-10-25T20:55:00.000Z',
      is_on_diet: false,
      user_id: 'user_id_1',
      id: '#1',
    })

    const promise = sut.execute({
      mealId: '#1',
      userId: 'user_id_2',
      name: 'Strogonof de carne',
    })

    await expect(promise).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
