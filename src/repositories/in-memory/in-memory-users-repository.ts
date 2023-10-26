import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const newUser: User = {
      id: randomUUID(),
      email: data.email,
      name: data.name,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.users.push(newUser)

    return newUser
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((usr) => usr.email === email)

    if (!user) return null

    return user
  }
}
