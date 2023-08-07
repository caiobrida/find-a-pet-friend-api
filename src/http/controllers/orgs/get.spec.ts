import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

describe('Get org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get the authenticated org', async () => {
    await prisma.org.create({
      data: {
        name: 'test org',
        email: 'test@test.com',
        password: await hash('123456', 6),
        phone: '111111111',
        city: 'test city',
        state: 'sp',
        cep: '13973041',
      },
    })

    const authRes = await request(app.server).post('/auth').send({
      email: 'test@test.com',
      password: '123456',
    })

    const profileRes = await request(app.server)
      .get('/org')
      .set('Authorization', `Bearer ${authRes.body.token}`)
      .send()

    expect(profileRes.statusCode).toEqual(200)
    expect(profileRes.body.org).toEqual(
      expect.objectContaining({
        email: 'test@test.com',
      }),
    )
  })
})
