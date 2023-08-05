import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { SearchOrgUseCase } from '../search-orgs'

export function makeSearchOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository()

  const useCase = new SearchOrgUseCase(orgsRepository)

  return useCase
}
