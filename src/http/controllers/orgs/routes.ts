import { FastifyInstance } from 'fastify'
import { create } from './create'
import { authenticate } from './authenticate'
import { search } from './search'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { get } from './get'

export async function orgsRoutes(app: FastifyInstance) {
  app.get('/search-orgs-pets', search)
  app.post('/auth', authenticate)
  app.post('/orgs', create)

  app.get('/org', { onRequest: [verifyJWT] }, get)
}
