import { FastifyInstance } from 'fastify'
import { inject, singleton } from 'tsyringe'
import { RegisterMealController } from './register'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

@singleton()
export class MealsRoutes {
  constructor(
    @inject(RegisterMealController)
    private readonly registerMealController: RegisterMealController,
  ) {}

  async mountRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)

    app.post('/', (request, reply) =>
      this.registerMealController.handle(request, reply),
    )
  }
}
