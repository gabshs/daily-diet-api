import { FastifyInstance } from 'fastify'
import { inject, singleton } from 'tsyringe'
import { RegisterMealController } from './register'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { ListMealsController } from './list-all'

@singleton()
export class MealsRoutes {
  constructor(
    @inject(RegisterMealController)
    private readonly registerMealController: RegisterMealController,
    @inject(ListMealsController)
    private readonly listMealsController: ListMealsController,
  ) {}

  async mountRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)

    app.post('/', (request, reply) =>
      this.registerMealController.handle(request, reply),
    )

    app.get('/', (request, reply) =>
      this.listMealsController.handle(request, reply),
    )
  }
}
