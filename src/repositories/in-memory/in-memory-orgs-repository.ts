import { Org } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'node:crypto'
import OrgsPetsSearchQuery from '@/@types/orgs-pets-search-query'
import { customFilter } from '@/utils/custom-filter-array'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async create(data: Org) {
    const org = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      role: data.role || 'NORMAL',
      city: data.city,
      state: data.state,
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

  async searchMany(query: OrgsPetsSearchQuery, page: number) {
    const filteredOrgs = this.items.filter(
      (org) => org.city === query.city && org.state === query.state,
    )

    if (!filteredOrgs) return []

    const petQuery = {
      ...query,
      city: undefined,
      state: undefined,
    }

    const orgsWithPets = filteredOrgs.map((org) => {
      const filteredPets = org.pets
        ? customFilter(org.pets, petQuery, page, 20)
        : []
      return { ...org, pets: filteredPets }
    })

    return orgsWithPets
  }
}
