import { UsersRepository } from '@/repositories/users-repository'
import { compare } from 'bcrypt'
import { inject, singleton } from 'tsyringe'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

export interface AuthenticateUseCaseParams {
  email: string
  password: string
}

@singleton()
export class AuthenticateUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({ email, password }: AuthenticateUseCaseParams) {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
