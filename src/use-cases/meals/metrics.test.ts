import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { MealsMetricsUseCase } from './metrics'

let mealsRepository: InMemoryMealsRepository
let sut: MealsMetricsUseCase

describe('MealsMetricsUseCase', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new MealsMetricsUseCase(mealsRepository)
  })

  it('should be able to list user meals metrics', async () => {
    await mealsRepository.create({
      name: 'Strogonof de frango',
      description: 'Arroz branco, strogonof de frango, batata frita',
      eaten_at: new Date('2023-10-20T12:55:00.000Z'),
      is_on_diet: true,
      user_id: 'user_id_1',
    })
    await mealsRepository.create({
      name: 'Strogonof de frango',
      description: 'Arroz branco, strogonof de frango, batata frita',
      eaten_at: new Date('2023-10-21T12:55:00.000Z'),
      is_on_diet: false,
      user_id: 'user_id_1',
    })
    await mealsRepository.create({
      name: 'Strogonof de frango',
      description: 'Arroz branco, strogonof de frango, batata frita',
      eaten_at: new Date('2023-10-22T12:55:00.000Z'),
      is_on_diet: true,
      user_id: 'user_id_1',
    })
    await mealsRepository.create({
      name: 'Strogonof de frango',
      description: 'Arroz branco, strogonof de frango, batata frita',
      eaten_at: new Date('2023-10-23T12:55:00.000Z'),
      is_on_diet: true,
      user_id: 'user_id_1',
    })
    await mealsRepository.create({
      name: 'Strogonof de frango',
      description: 'Arroz branco, strogonof de frango, batata frita',
      eaten_at: new Date('2023-10-24T12:55:00.000Z'),
      is_on_diet: true,
      user_id: 'user_id_2',
    })
    await mealsRepository.create({
      name: 'Strogonof de frango',
      description: 'Arroz branco, strogonof de frango, batata frita',
      eaten_at: new Date('2023-10-25T12:55:00.000Z'),
      is_on_diet: false,
      user_id: 'user_id_1',
    })

    const { metrics } = await sut.execute('user_id_1')

    expect(metrics).toEqual({
      totalOfMeals: 5,
      mealsOnDiet: 3,
      mealsOutDiet: 2,
      bestSequenceOnDiet: 2,
    })
  })
})
