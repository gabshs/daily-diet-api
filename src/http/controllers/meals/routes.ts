import { FastifyInstance } from 'fastify'
import { inject, singleton } from 'tsyringe'
import { RegisterMealController } from './register'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { ListMealsController } from './list-all'
import { FindMealController } from './find'
import { DeleteMealController } from './delete'
import { GetMealsMetricsController } from './metrics'
import { UpdateMealController } from './update'

@singleton()
export class MealsRoutes {
  constructor(
    @inject(RegisterMealController)
    private readonly registerMealController: RegisterMealController,
    @inject(ListMealsController)
    private readonly listMealsController: ListMealsController,
    @inject(FindMealController)
    private readonly findMealController: FindMealController,
    @inject(DeleteMealController)
    private readonly deleteMealController: DeleteMealController,
    @inject(GetMealsMetricsController)
    private readonly getMealsMetricsController: GetMealsMetricsController,
    @inject(UpdateMealController)
    private readonly updateMealsController: UpdateMealController,
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

    app.patch('/:mealId', (request, reply) =>
      this.updateMealsController.handle(request, reply),
    )

    app.delete('/:mealId', (request, reply) =>
      this.deleteMealController.handle(request, reply),
    )

    app.get('/metrics', (request, reply) =>
      this.getMealsMetricsController.handle(request, reply),
    )
  }
}
