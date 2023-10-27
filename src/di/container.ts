import { MealsRepository } from '@/repositories/meals-repository'
import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { container } from 'tsyringe'

container.registerSingleton<UsersRepository>(
  'UsersRepository',
  PrismaUsersRepository,
)

container.registerSingleton<MealsRepository>(
  'MealsRepository',
  PrismaMealsRepository,
)

export { container }
