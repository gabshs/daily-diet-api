import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { container } from 'tsyringe'

container.registerSingleton<UsersRepository>(
  'UsersRepository',
  PrismaUsersRepository,
)

export { container }
