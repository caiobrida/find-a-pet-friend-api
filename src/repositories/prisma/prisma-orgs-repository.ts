import { Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { prisma } from '@/lib/prisma'
import OrgsPetsSearchQuery from '@/@types/orgs-pets-search-query'

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    })

    return org
  }

  async findById(orgId: string) {
    const org = await prisma.org.findUnique({
      where: {
        id: orgId,
      },
    })

    return org
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    })

    return org
  }

  async searchMany(query: OrgsPetsSearchQuery, page: number) {
    throw new Error('Method not implemented.')
  }
}
