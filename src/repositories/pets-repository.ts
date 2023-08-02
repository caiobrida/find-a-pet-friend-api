import OrgsPetsSearchQuery from '@/@types/orgs-pets-search-query'
import { Prisma, Pet } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(petId: string): Promise<Pet | null>
  searchMany(query: OrgsPetsSearchQuery, page: number): Promise<Pet[]>
}
