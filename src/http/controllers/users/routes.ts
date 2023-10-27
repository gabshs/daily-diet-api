import { FastifyInstance } from 'fastify'
import { inject, singleton } from 'tsyringe'
import { RegisterUserController } from './register'
import { AuthenticateController } from './authenticate'

@singleton()
export class UsersRoutes {
  constructor(
    @inject(RegisterUserController)
    private readonly registerUserController: RegisterUserController,
    @inject(AuthenticateController)
    private readonly authenticateUserController: AuthenticateController,
  ) {}

  async mountRoutes(app: FastifyInstance) {
    app.post('/users', (request, reply) =>
      this.registerUserController.handle(request, reply),
    )

    app.post('/sessions/', (request, reply) =>
      this.authenticateUserController.handle(request, reply),
    )
  }
}
