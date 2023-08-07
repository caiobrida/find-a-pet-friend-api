import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, it, expect } from 'vitest'

describe('Search orgs pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search the orgs pets', async () => {
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

    await request(app.server)
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

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authRes.body.token}`)
      .send({
        name: 'pet-name',
        description: 'pet-description',
        age: 'ADULT',
        shape: 'SMALL',
        energyLevel: 'LOW',
        independenceLevel: 'LOW',
        environment: 'SMALL',
      })

    const res = await request(app.server)
      .get('/orgs/search-pets')
      .query({ age: 'ADULT', city: 'test city', state: 'sp' })
      .send()

    expect(res.statusCode).toEqual(200)
    expect(res.body.orgs).toHaveLength(1)
    expect(res.body.orgs).toEqual([
      expect.objectContaining({
        email: 'test@test.com',
      }),
    ])
    expect(res.body.orgs[0].pets).toHaveLength(1)
    expect(res.body.orgs[0].pets).toEqual([
      expect.objectContaining({
        age: 'ADULT',
      }),
    ])
  })
})
