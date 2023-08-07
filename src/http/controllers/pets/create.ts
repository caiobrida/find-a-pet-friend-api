import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function create(req: FastifyRequest, res: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    description: z.string().default(''),
    age: z.enum(['PUPPY', 'ADULT', 'ELDERLY']),
    shape: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
    energyLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    independenceLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    environment: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
  })

  const {
    name,
    description,
    age,
    shape,
    energyLevel,
    independenceLevel,
    environment,
  } = createPetBodySchema.parse(req.body)

  const createPetUseCase = makeCreatePetUseCase()

  const { pet } = await createPetUseCase.execute({
    name,
    description,
    age,
    shape,
    energy_level: energyLevel,
    independence_level: independenceLevel,
    environment,
    org_id: req.user.sub,
  })

  return res.status(201).send({ pet })
}
