import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      org_id: data.org_id,
      name: data.name,
      description: data.description,
      age: data.age,
      shape: data.shape,
      energy_level: data.energy_level,
      independence_level: data.independence_level,
      environment: data.environment,
      photos: [],
      requirements: [],
    }

    this.items.push(pet)

    return pet
  }

  async findById(petId: string) {
    const pet = this.items.find((i) => i.id === petId)

    if (!pet) return null

    return pet
  }
}
