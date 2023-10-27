import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Update meal (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to update a registered meal', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const meal = await prisma.meal.create({
      data: {
        name: 'Strogonof de frango',
        description: 'Arroz branco, strogonof de frango, batata frita',
        eaten_at: new Date('2023-10-25T20:55:00.000Z'),
        is_on_diet: false,
        user_id: user.id,
      },
    })

    const response = await request(app.server)
      .patch(`/meals/${meal.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Strogonof de carne',
        description: 'Arroz branco, strogonof de carne, batata frita',
        isOnDiet: true,
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body.meal).toEqual({
      id: meal.id,
      name: 'Strogonof de carne',
      description: 'Arroz branco, strogonof de carne, batata frita',
      eaten_at: '2023-10-25T20:55:00.000Z',
      is_on_diet: true,
      user_id: user.id,
      created_at: expect.any(String),
    })
  })
})
