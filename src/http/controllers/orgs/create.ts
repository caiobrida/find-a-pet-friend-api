import { CepNotExistsError } from '@/use-cases/errors/cep-not-exists'
import { EmailInUseError } from '@/use-cases/errors/email-in-use'
import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function create(req: FastifyRequest, res: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string(),
    cep: z.string().min(8).max(8),
  })

  const { name, email, password, phone, cep } = createBodySchema.parse(req.body)

  try {
    const createOrgUseCase = makeCreateOrgUseCase()

    await createOrgUseCase.execute({ name, email, password, phone, cep })
  } catch (err) {
    if (err instanceof EmailInUseError) {
      return res.status(409).send({ msg: err.message })
    }
    if (err instanceof CepNotExistsError) {
      return res.status(409).send({ msg: err.message })
    }

    throw err
  }
}
