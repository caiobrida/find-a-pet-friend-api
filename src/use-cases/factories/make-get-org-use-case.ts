import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { GetOrgUseCase } from '../get-org'

export function makeCreateOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository()

  const useCase = new GetOrgUseCase(orgsRepository)

  return useCase
}
