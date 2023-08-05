import { FastifyInstance } from 'fastify'
import { find } from './find'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { create } from './create'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:petId', find)
  app.post('/pets', { onRequest: [verifyJWT] }, create)
}
