import { Prisma, Org } from '@prisma/client'

export interface OrgsRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org>
  findById(orgId: string): Promise<Org | null>
  findByEmail(email: string): Promise<Org | null>
}
