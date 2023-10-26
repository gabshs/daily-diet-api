import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcrypt'
import { inject, injectable } from 'tsyringe'
import { ResourceAlreadyExistsError } from '../errors/resource-already-exists-error'

export interface RegisterUserUseCaseParams {
  name: string
  email: string
  password: string
}

@injectable()
export class RegisterUseCase {
  constructor(
    @inject(PrismaUsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({ name, email, password }: RegisterUserUseCaseParams) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new ResourceAlreadyExistsError('User')
    }

    const passwordHash = await hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash,
    })

    return {
      user: { ...user, passwordHash: undefined },
    }
  }
}
