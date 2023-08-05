import OrgsPetsSearchQuery from '@/@types/orgs-pets-search-query'
import { Org, Prisma } from '@prisma/client'

export interface OrgsRepository {
  create(data: Org | Prisma.OrgCreateInput): Promise<Org>
  findById(orgId: string): Promise<Org | null>
  findByEmail(email: string): Promise<Org | null>
  searchMany(
    city: string,
    state: string,
    query: OrgsPetsSearchQuery,
    page: number,
  ): Promise<Org[]>
}
