import { FastifyInstance } from 'fastify'
import { inject, singleton } from 'tsyringe'
import { RegisterUserController } from './register'

@singleton()
export class UsersRoutes {
  constructor(
    @inject(RegisterUserController)
    private readonly registerUserController: RegisterUserController,
  ) {}

  async mountRoutes(app: FastifyInstance) {
    app.post('/', (request, reply) =>
      this.registerUserController.handle(request, reply),
    )
  }
}
