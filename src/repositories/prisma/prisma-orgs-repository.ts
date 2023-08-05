import { Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { prisma } from '@/lib/prisma'
import OrgsPetsSearchQuery from '@/@types/orgs-pets-search-query'

const PAGE_SIZE = 20

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

  async searchMany(
    city: string,
    state: string,
    query: OrgsPetsSearchQuery,
    page: number,
  ) {
    const skip = (page - 1) * PAGE_SIZE

    const orgs = await prisma.org.findMany({
      where: {
        city,
        state,
      },
      include: {
        pets: {
          where: {
            ...query,
          },
        },
      },
      skip,
      take: PAGE_SIZE,
    })

    return orgs
  }
}
