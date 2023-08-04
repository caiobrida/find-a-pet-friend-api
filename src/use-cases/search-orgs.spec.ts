import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { SearchOrgUseCase } from './search-orgs'

let orgsRepository: InMemoryOrgsRepository
let sut: SearchOrgUseCase

describe('Get orgs use case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new SearchOrgUseCase(orgsRepository)
  })

  it('should be able to search orgs by city and state', async () => {
    await orgsRepository.create({
      cep: '12345678',
      email: 'test@test.com',
      city: 'test',
      state: 't',
      name: 'test',
      password: await hash('123456', 6),
      phone: '1111111111',
      role: 'NORMAL',
    })

    await orgsRepository.create({
      cep: '12345678',
      email: 'test@test.com',
      city: 'test2',
      state: 't2',
      name: 'test',
      password: await hash('123456', 6),
      phone: '1111111111',
      role: 'NORMAL',
    })

    await orgsRepository.create({
      cep: '12345678',
      email: 'test@test.com',
      city: 'test2',
      state: 't2',
      name: 'test',
      password: await hash('123456', 6),
      phone: '1111111111',
      role: 'NORMAL',
    })

    const query = { city: 'test2', state: 't2' }

    const { orgs } = await sut.execute({ query, page: 1 })

    expect(orgs).toHaveLength(2)
  })

  it('should be able to search orgs by city and state and filter pets', async () => {
    await orgsRepository.create({
      cep: '12345678',
      email: 'test@test.com',
      city: 'test',
      state: 't',
      name: 'test',
      password: await hash('123456', 6),
      phone: '1111111111',
      role: 'NORMAL',
      pets: [
        {
          age: 'ADULT',
          description: 'test1',
          energy_level: 'HIGH',
          environment: 'MEDIUM',
          id: 'fake-id-1',
          independence_level: 'HIGH',
          name: 'test1',
          org_id: 'fake-org-id-1',
          photos: [],
          requirements: [],
          shape: 'LARGE',
        },
        {
          age: 'ADULT',
          description: 'test1',
          energy_level: 'HIGH',
          environment: 'MEDIUM',
          id: 'fake-id-2',
          independence_level: 'HIGH',
          name: 'test1',
          org_id: 'fake-org-id-1',
          photos: [],
          requirements: [],
          shape: 'LARGE',
        },
        {
          age: 'ELDERLY',
          description: 'test1',
          energy_level: 'LOW',
          environment: 'MEDIUM',
          id: 'fake-id-3',
          independence_level: 'HIGH',
          name: 'test1',
          org_id: 'fake-org-id-1',
          photos: [],
          requirements: [],
          shape: 'LARGE',
        },
      ],
    })

    await orgsRepository.create({
      cep: '12345678',
      email: 'test@test.com',
      city: 'test2',
      state: 't2',
      name: 'test',
      password: await hash('123456', 6),
      phone: '1111111111',
      role: 'NORMAL',
    })

    await orgsRepository.create({
      cep: '12345678',
      email: 'test@test.com',
      city: 'test2',
      state: 't2',
      name: 'test',
      password: await hash('123456', 6),
      phone: '1111111111',
      role: 'NORMAL',
    })

    const query = {
      city: 'test',
      state: 't',
      age: 'ADULT',
      energy_level: 'HIGH',
    }

    const { orgs } = await sut.execute({ query, page: 1 })

    console.log('orgs', orgs)

    expect(orgs).toHaveLength(1)
    expect(orgs[0].pets).toHaveLength(2)
    expect(orgs[0].pets).toEqual([
      expect.objectContaining({
        id: 'fake-id-1',
      }),
      expect.objectContaining({
        id: 'fake-id-2',
      }),
    ])
  })
})
