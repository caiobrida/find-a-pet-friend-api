import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { CreatePetUseCase } from './create-pet'

let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create pets use case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should be able to create a new pet', async () => {
    const { pet } = await sut.execute({
      age: 'ADULT',
      org_id: 'fake-id-org',
      name: 'test',
      description: 'test',
      shape: 'MEDIUM',
      independence_level: 'HIGH',
      environment: 'LARGE',
      energy_level: 'MEDIUM',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
