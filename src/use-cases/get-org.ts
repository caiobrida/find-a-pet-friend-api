import { Org } from '@prisma/client'
import { OrgsRepository } from '../repositories/orgs-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface GetOrgUseCaseRquest {
  orgId: string
}

interface GetOrgUseCaseResponse {
  org: Org
}

export class GetOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    orgId,
  }: GetOrgUseCaseRquest): Promise<GetOrgUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    return { org }
  }
}
