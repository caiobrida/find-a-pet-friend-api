import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../repositories/orgs-repository'
import OrgsPetsSearchQuery from '@/@types/orgs-pets-search-query'

interface SearchOrgUseCaseRquest {
  city: string
  state: string
  query: OrgsPetsSearchQuery
  page: number
}

interface SearchOrgUseCaseResponse {
  orgs: Org[]
}

export class SearchOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    city,
    state,
    page,
    query,
  }: SearchOrgUseCaseRquest): Promise<SearchOrgUseCaseResponse> {
    const orgs = await this.orgsRepository.searchMany(city, state, query, page)

    return { orgs }
  }
}
