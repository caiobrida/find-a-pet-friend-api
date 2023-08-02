import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository'
import { CreateOrgUseCase } from './create-org'
import { compare } from 'bcryptjs'
import { EmailInUseError } from './errors/email-in-use'
import { CepNotExistsError } from './errors/cep-not-exists'

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Create orgs use case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should be able to create a new org', async () => {
    const { org } = await sut.execute({
      cep: '13973041',
      state: 'test',
      city: 'test',
      email: 'test@test.com',
      name: 'test',
      password: '123456',
      phone: '1111111111',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash the org password', async () => {
    const { org } = await sut.execute({
      cep: '13973041',
      state: 'test',
      city: 'test',
      email: 'test@test.com',
      name: 'test',
      password: '123456',
      phone: '1111111111',
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register a new org with same email twice', async () => {
    const email = 'test@test.com'

    await sut.execute({
      cep: '13973041',
      state: 'test',
      city: 'test',
      email,
      name: 'test',
      password: '123456',
      phone: '1111111111',
    })

    await expect(() =>
      sut.execute({
        cep: '13973041',
        state: 'test',
        city: 'test',
        email,
        name: 'test',
        password: '123456',
        phone: '1111111111',
      }),
    ).rejects.toBeInstanceOf(EmailInUseError)
  })

  it('should not be able to register a new org with same email twice', async () => {
    const email = 'test@test.com'

    await expect(() =>
      sut.execute({
        cep: '12345678',
        state: 'test',
        city: 'test',
        email,
        name: 'test',
        password: '123456',
        phone: '1111111111',
      }),
    ).rejects.toBeInstanceOf(CepNotExistsError)
  })
})
