import { makeGetOrgUseCase } from '@/use-cases/factories/make-get-org-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function get(req: FastifyRequest, res: FastifyReply) {
  const getOrgUseCase = makeGetOrgUseCase()

  const { org } = await getOrgUseCase.execute({ orgId: req.user.sub })

  return res.status(200).send({ org })
}
