import {
  Age,
  EnergyLevel,
  Environmnet,
  IndependenceLevel,
  Pet,
  Shape,
} from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface CreatePetUseCaseRequest {
  org_id: string
  name: string
  description: string
  age: Age
  shape: Shape
  energy_level: EnergyLevel
  independence_level: IndependenceLevel
  environment: Environmnet
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    org_id: orgId,
    name,
    description,
    age,
    shape,
    energy_level: energyLevel,
    independence_level: independenceLevel,
    environment,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      org_id: orgId,
      name,
      description,
      age,
      shape,
      energy_level: energyLevel,
      independence_level: independenceLevel,
      environment,
    })

    return { pet }
  }
}
