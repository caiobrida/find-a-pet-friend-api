import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository'
import { GetOrgUseCase } from './get-org'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from './errors/resource-not-found'

let orgsRepository: InMemoryOrgsRepository
let sut: GetOrgUseCase

describe('Get orgs use case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetOrgUseCase(orgsRepository)
  })

  it('should be able to get a org', async () => {
    const createdOrg = await orgsRepository.create({
      cep: '123456',
      email: 'test@test.com',
      city: 'test',
      state: 't',
      name: 'test',
      password: await hash('123456', 6),
      phone: '1111111111',
      role: 'NORMAL',
    })

    const { org } = await sut.execute({ orgId: createdOrg.id })

    expect(org.id).toEqual(expect.any(String))
    expect(org.name).toEqual('test')
  })

  it('should not be able to get a org with wrong id', async () => {
    await expect(() =>
      sut.execute({ orgId: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
