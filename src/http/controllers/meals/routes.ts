import { FastifyInstance } from 'fastify'
import { inject, singleton } from 'tsyringe'
import { RegisterMealController } from './register'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { ListMealsController } from './list-all'
import { FindMealController } from './find'

@singleton()
export class MealsRoutes {
  constructor(
    @inject(RegisterMealController)
    private readonly registerMealController: RegisterMealController,
    @inject(ListMealsController)
    private readonly listMealsController: ListMealsController,
    @inject(FindMealController)
    private readonly findMealController: FindMealController,
  ) {}

  async mountRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)

    app.post('/', (request, reply) =>
      this.registerMealController.handle(request, reply),
    )

    app.get('/', (request, reply) =>
      this.listMealsController.handle(request, reply),
    )

    app.get('/:mealId', (request, reply) =>
      this.findMealController.handle(request, reply),
    )
  }
}
