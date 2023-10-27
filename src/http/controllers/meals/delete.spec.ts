import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Delete meal (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete a registered meal', async () => {
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
      .delete(`/meals/${meal.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(204)

    const listMealsResponse = await request(app.server)
      .get(`/meals`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(listMealsResponse.body.meals).toHaveLength(0)
  })
})
