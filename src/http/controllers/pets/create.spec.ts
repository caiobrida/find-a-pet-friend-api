import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, it, expect } from 'vitest'

describe('Create pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    await request(app.server).post('/orgs').send({
      name: 'test org',
      email: 'test@test.com',
      password: '123456',
      phone: '111111111',
      city: 'test city',
      state: 'sp',
      cep: '13973041',
    })

    const authRes = await request(app.server).post('/auth').send({
      email: 'test@test.com',
      password: '123456',
    })

    const res = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authRes.body.token}`)
      .send({
        name: 'pet-name',
        description: 'pet-description',
        age: 'PUPPY',
        shape: 'SMALL',
        energyLevel: 'LOW',
        independenceLevel: 'LOW',
        environment: 'SMALL',
      })

    expect(res.statusCode).toEqual(201)
  })
})
