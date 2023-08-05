import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FindPetUseCase } from '../find-pet'

export function makeFindPetUseCase() {
  const petsRepository = new PrismaPetsRepository()

  const useCase = new FindPetUseCase(petsRepository)

  return useCase
}
