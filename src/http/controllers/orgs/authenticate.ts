import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const createBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = createBodySchema.parse(req.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { org } = await authenticateUseCase.execute({ email, password })

    const token = await res.jwtSign(
      { role: org.role },
      { sign: { sub: org.id } },
    )

    const refreshToken = await res.jwtSign(
      { role: org.role },
      { sign: { sub: org.id, expiresIn: '7d' } },
    )

    return res
      .status(200)
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .send({ token })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return res.status(409).send({ msg: err.message })
    }

    throw err
  }
}
