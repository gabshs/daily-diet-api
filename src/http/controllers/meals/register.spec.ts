import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Register meal (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a meal', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const response = await request(app.server)
      .post('/meals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Strogonof de frango',
        description: 'Arroz branco, strogonof de frango, batata frita',
        eatenAt: new Date('2023-10-25T20:55:00.000Z'),
        isOnDiet: false,
      })

    expect(response.statusCode).toEqual(201)
  })
})
