import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface FindPetUseCaseRequest {
  petId: string
}

interface FindPetUseCaseResponse {
  pet: Pet
}

export class FindPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: FindPetUseCaseRequest): Promise<FindPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return { pet }
  }
}
