import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, it, expect } from 'vitest'

describe('Auth org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/orgs').send({
      name: 'test org',
      email: 'test@test.com',
      password: '123456',
      phone: '111111111',
      city: 'test city',
      state: 'sp',
      cep: '13973041',
    })

    const res = await request(app.server).post('/auth').send({
      email: 'test@test.com',
      password: '123456',
    })

    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({
      token: expect.any(String),
    })
  })
})
