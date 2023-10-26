import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcrypt'

export interface RegisterUserUseCaseParams {
  name: string
  email: string
  password: string
}
export class RegisterUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUserUseCaseParams) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (!userAlreadyExists) {
      throw new Error()
    }

    const passwordHash = await hash(password, 'dailyDietApi')

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
