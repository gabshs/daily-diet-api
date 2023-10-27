import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Authenticate user (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate a user', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123123q',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'john@example.com',
      password: '123123q',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({ token: expect.any(String) })
  })
})
