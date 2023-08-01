import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      cep: data.cep,
      password: data.password,
      phone: data.phone,
      created_at: new Date(),
      pets: data.pets,
    }

    this.items.push(org)

    return org
  }

  async findById(orgId: string) {
    const org = this.items.find((i) => i.id === orgId)

    if (!org) return null

    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((i) => i.email === email)

    if (!org) return null

    return org
  }
}
