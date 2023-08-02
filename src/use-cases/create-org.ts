import { Org } from '@prisma/client'
import { OrgsRepository } from '../repositories/orgs-repository'
import { hash } from 'bcryptjs'
import { EmailInUseError } from './errors/email-in-use'
import { getCepIfExists } from '../utils/get-cep-if-exists'
import { CepNotExistsError } from './errors/cep-not-exists'

interface CreateOrgUseCaseRequest {
  cep: string
  email: string
  name: string
  city: string
  state: string
  password: string
  phone: string
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    cep,
    email,
    name,
    city,
    state,
    password,
    phone,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new EmailInUseError()
    }

    const cepExists = await getCepIfExists(cep)

    if (cepExists === null) {
      throw new CepNotExistsError()
    }

    const passwordHash = await hash(password, 6)

    const org = await this.orgsRepository.create({
      cep,
      email,
      name,
      city,
      state,
      password: passwordHash,
      phone,
    })

    return { org }
  }
}
