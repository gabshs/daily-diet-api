import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Meal metrics (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to get users meals metrics', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    await prisma.meal.createMany({
      data: [
        {
          name: 'Strogonof de frango',
          description: 'Arroz branco, strogonof de frango, batata frita',
          eaten_at: new Date('2023-10-25T20:55:00.000Z'),
          is_on_diet: false,
          user_id: user.id,
        },
        {
          name: 'Strogonof de frango',
          description: 'Arroz branco, strogonof de frango, batata frita',
          eaten_at: new Date('2023-10-25T20:55:00.000Z'),
          is_on_diet: true,
          user_id: user.id,
        },
        {
          name: 'Strogonof de frango',
          description: 'Arroz branco, strogonof de frango, batata frita',
          eaten_at: new Date('2023-10-25T20:55:00.000Z'),
          is_on_diet: true,
          user_id: user.id,
        },
      ],
    })

    const response = await request(app.server)
      .get(`/meals/metrics`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.metrics).toEqual({
      bestSequenceOnDiet: 2,
      mealsOnDiet: 2,
      mealsOutDiet: 1,
      totalOfMeals: 3,
    })
  })
})
