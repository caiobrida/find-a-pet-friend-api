import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate use case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    await orgsRepository.create({
      cep: '123456',
      email: 'test@test.com',
      name: 'test',
      password: await hash('123456', 6),
      phone: '1111111111',
      city: 'test',
      state: 'test',
      role: 'NORMAL',
    })

    const { org } = await sut.execute({
      email: 'test@test.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await orgsRepository.create({
      cep: '123456',
      email: 'test@test.com',
      name: 'test',
      password: await hash('123456', 6),
      phone: '1111111111',
      city: 'test',
      state: 'test',
      role: 'NORMAL',
    })

    await expect(() =>
      sut.execute({
        email: 'test2@test2.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await orgsRepository.create({
      cep: '123456',
      email: 'test@test.com',
      name: 'test',
      password: await hash('123456', 6),
      phone: '1111111111',
      city: 'test',
      state: 'test',
      role: 'NORMAL',
    })

    await expect(() =>
      sut.execute({
        email: 'test@test.com',
        password: 'wrongpass',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
