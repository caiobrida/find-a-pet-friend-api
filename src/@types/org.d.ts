import { Pet, Org as PrismaOrg, Role } from '@prisma/client'

declare module '@prisma/client' {
  interface Org extends PrismaOrg {
    id?: string
    name: string
    email: string
    city: string
    state: string
    cep: string
    password: string
    phone: string
    role: Role
    created_at?: Date
    pets?: Pet[]
  }
}
