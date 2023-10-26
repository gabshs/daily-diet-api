import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterMealUseCase } from './register'
import { randomUUID } from 'crypto'

let mealsRepository: InMemoryMealsRepository
let sut: RegisterMealUseCase

describe('RegisterMealUseCase', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new RegisterMealUseCase(mealsRepository)
  })
  it('should be able to register a new meal', async () => {
    const { meal } = await sut.execute({
      name: 'Strogonof de frango',
      description: 'Arroz branco, strogonof de frango, batata frita',
      eatenAt: '2023-10-25T20:55:00.000Z',
      isOnDiet: false,
      userId: randomUUID(),
    })

    expect(meal.id).toEqual(expect.any(String))
  })
})
