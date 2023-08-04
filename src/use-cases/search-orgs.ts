import { Org } from '@prisma/client'
import { OrgsRepository } from '../repositories/orgs-repository'
import OrgsPetsSearchQuery from '@/@types/orgs-pets-search-query'

interface SearchOrgUseCaseRquest {
  query: OrgsPetsSearchQuery
  page: number
}

interface SearchOrgUseCaseResponse {
  orgs: Org[]
}

export class SearchOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    page,
    query,
  }: SearchOrgUseCaseRquest): Promise<SearchOrgUseCaseResponse> {
    const orgs = await this.orgsRepository.searchMany(query, page)

    return { orgs }
  }
}
