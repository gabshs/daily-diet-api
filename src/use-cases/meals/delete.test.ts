import 'reflect-metadata'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { DeleteMealUseCase } from './delete'

let mealsRepository: InMemoryMealsRepository
let sut: DeleteMealUseCase

describe('DeleteMealUseCase', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new DeleteMealUseCase(mealsRepository)
  })
  it('should be able to delete a meal', async () => {
    await mealsRepository.create({
      name: 'Strogonof de frango',
      description: 'Arroz branco, strogonof de frango, batata frita',
      eaten_at: '2023-10-25T20:55:00.000Z',
      is_on_diet: false,
      user_id: 'user_id_1',
      id: '#1',
    })

    expect(mealsRepository.items).toHaveLength(1)

    const { meal } = await sut.execute({
      mealId: '#1',
      userId: 'user_id_1',
    })

    expect(meal).toEqual({
      name: 'Strogonof de frango',
      description: 'Arroz branco, strogonof de frango, batata frita',
      eaten_at: new Date('2023-10-25T20:55:00.000Z'),
      is_on_diet: false,
      user_id: 'user_id_1',
      id: '#1',
      created_at: expect.any(Date),
    })

    expect(mealsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a meal when userId is incorrect', async () => {
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
    })

    await expect(promise).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
