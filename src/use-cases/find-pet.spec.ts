import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FindPetUseCase } from './find-pet'

let petsRepository: InMemoryPetsRepository
let sut: FindPetUseCase

describe('Find pets use case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FindPetUseCase(petsRepository)
  })

  it('should be able to find a pet', async () => {
    const createdPet = await petsRepository.create({
      age: 'ADULT',
      org_id: 'fake-id-org',
      name: 'test',
      description: 'test',
      shape: 'MEDIUM',
      independence_level: 'HIGH',
      environment: 'LARGE',
      energy_level: 'MEDIUM',
    })

    await petsRepository.create({
      age: 'ADULT',
      org_id: 'fake-id-org',
      name: 'test2',
      description: 'test',
      shape: 'MEDIUM',
      independence_level: 'HIGH',
      environment: 'LARGE',
      energy_level: 'MEDIUM',
    })

    const { pet } = await sut.execute({ petId: createdPet.id })

    expect(pet.name).toEqual('test')
  })
})
