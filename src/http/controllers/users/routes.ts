import { FastifyInstance } from 'fastify'
import { RegisterUserController } from './register'
import { singleton } from 'tsyringe'

@singleton()
export class UsersRoutes {
  constructor(
    private readonly registerUserController: RegisterUserController,
  ) {}

  async mountRoutes(app: FastifyInstance) {
    app.post('/', this.registerUserController.handle)
  }
}
