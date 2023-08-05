import { makeFindPetUseCase } from '@/use-cases/factories/make-find-pet-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function find(req: FastifyRequest, res: FastifyReply) {
  const findPetParamsSchema = z.object({
    petId: z.string().uuid(),
  })

  const { petId } = findPetParamsSchema.parse(req.params)

  const findPetUseCase = makeFindPetUseCase()

  const { pet } = await findPetUseCase.execute({ petId })

  return res.status(200).send({ pet })
}
