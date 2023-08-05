import { makeSearchOrgUseCase } from '@/use-cases/factories/make-search-org-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function search(req: FastifyRequest, res: FastifyReply) {
  const createSearchSchema = z.object({
    page: z.number().default(1),
    city: z.string(),
    state: z.string(),
    age: z.union([z.enum(['PUPPY', 'ADULT', 'ELDERLY']), z.undefined()]),
    shape: z.union([z.enum(['SMALL', 'MEDIUM', 'LARGE']), z.undefined()]),
    energyLevel: z.union([z.enum(['LOW', 'MEDIUM', 'HIGH']), z.undefined()]),
    independenceLevel: z.union([
      z.enum(['LOW', 'MEDIUM', 'HIGH']),
      z.undefined(),
    ]),
  })

  const { page, city, state, age, energyLevel, shape, independenceLevel } =
    createSearchSchema.parse(req.query)

  const query = {
    age,
    energy_level: energyLevel,
    shape,
    independence_level: independenceLevel,
  }

  const searchOrgUseCase = makeSearchOrgUseCase()

  const { orgs } = await searchOrgUseCase.execute({ city, state, query, page })

  return res.status(200).send({ orgs })
}
